<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-data-table :select-all="selectable" v-model="selected" :must-sort="mustSort"
                          :total-items="paginator.total"
                          :dark="theme.dark" disable-initial-sort
                          :headers="fields" :items="paginator.data" hide-actions :loading="loading"
                          :pagination.sync="pagination">
                <template slot="no-data">
                    <div v-html="placeholder"></div>
                </template>
                <template slot="items" slot-scope="props">
                    <tr  :active="props.selected">
                        <td v-if="selectable">
                            <v-checkbox
                                    primary
                                    hide-details
                                    v-model="props.selected"
                            ></v-checkbox>
                        </td>
                        <td v-if="!field.action" :class="field.align ? 'text-xs-'+ field.align : 'text-xs-left'"
                            v-for="field in fields"
                            v-html="renderField(props.item, field)" @click="clickField(props.item, field, props)">
                        </td>
                        <td :class="'text-xs-' + actionsAlign" v-if="hasActions">
                            <v-btn :flat="action.flat" :dark="action.dark"
                                   small :key="index"
                                   v-for="(action, index) in fixedActions" :color="action.color"
                                   :class="action.class"
                                   :fab="!action.text"
                                   v-if="showAction(action, props.item)"
                                   @click="callParentMethod(action.click, props.item)">
                                <v-icon>{{ action.icon }}</v-icon>
                                {{ action.text }}
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-flex>
        <v-layout xs12 row>
            <v-flex xs8 class="text-xs-left">

                <v-pagination class="text-xs-center pt-2" @input="page" :total-visible="7" circle
                              v-model="pagination.page"
                              :length="paginator.last_page"></v-pagination>
                <v-btn :dark="theme.dark" @click="refresh" :class="refreshing ? 'animate rotation' : ''"
                       class="pagination__item circle" style="top: -10px;" fab>
                    <v-icon>refresh</v-icon>
                </v-btn>
            </v-flex>
            <v-layout xs3 row  class="text-xl-right">
                <v-select
                        :items="pageSizes"
                        v-model="pageSize"
                        single-line
                        bottom
                        label="Select"
                        @input="load({})"
                        class="pull-right"
                ></v-select>
                <v-subheader class="pull-right" style="height: 74px;">{{displayAction(paginator)}}</v-subheader>
            </v-layout>
        </v-layout>
    </v-layout>
</template>

<script>
    import Api from './api'
    import theme from '../../mixins/theme'
    import { setQuery } from '../../app/utils'

    export default {
        props: {
            apiUrl: {
                type: String,
                default: () => ''
            },
            actions: {
                type: Array,
                default: () => []
            },
            headers: {
                type: Array,
                default: () => []
            },
            placeholder: {
                type: String,
                default: () => '没有更多数据'
            },
            actionsTitle: {
                type: String,
                default: () => '操作'
            },
            actionsAlign: {
                type: String,
                default: () => 'center'
            },
            mustSort: {
                type: Boolean,
                default: true
            },
            displayAction: {
                type: Function,
                default: paginator => `条/页, 从${paginator.from}到${paginator.to}条，共${paginator.total}条`
            },
            selectable: {
                type: Boolean,
                default: false
            },
            value: {
                type: Array,
                default: () => []
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        mixins: [theme],
        data () {
            return {
                fields: [],
                loading: false,
                refreshing: false,
                paginator: {
                    total: 0,
                    per_page: 10,
                    current_page: 0,
                    last_page: 0,
                    next_page_url: null,
                    prev_page_url: null,
                    from: 0,
                    to: 0,
                    data: []
                },
                pagination: {},
                fixedActions: [],
                pageSizes: [
                    10,
                    15,
                    20,
                    25,
                ],
                pageSize: 10,
                showActions: false
            }
        },
        computed: {
            hasActions () {
                let has = false
                this.actions.forEach(action => {
                    has = true
                })
                return has
            },
            selected: {
                get () {
                    return this.value
                },
                set (v) {
                    this.$emit('change', v)
                }
            }
        },
        components: {},
        methods: {
            load ({per_page = this.pageSize, page = 1, sort, filters = {}}) {
                this.loading = 'green'
                this.selected = [];
                let params = {
                    per_page,
                    page,
                    sort: sort !== undefined ? sort : this.resolveSort(this.pagination),
                };
                filters = this.buildFilters(filters);
                return Api.getData(this.apiUrl, Object.assign(params, filters)).then(response => {
                    let paginator = response.data;
                    this.loading = false
                    this.refreshing = false
                    paginator.url = setQuery(response.config.url, response.config.params);
                    this.paginator = paginator;
                    this.paginator.from = paginator.from ? paginator.from : 0;
                    this.paginator.to = paginator.to ? paginator.to : 0;
                    this.paginator = paginator
                    this.pagination.page = paginator.current_page
                    this.pagination.rowsPerPage = paginator.per_page
                    this.pagination.totalItems = paginator.total
                    this.emit('loaded', paginator)
                }).catch(error => {
                    this.loading = false
                    this.refreshing = false
                })
            },
            formatHeaders () {
                this.fields = this.headers.map(header => {
                    header.align = header.align || 'left'
                    return header
                })
                this.hasActions && this.fields.push({
                    text: this.actionsTitle,
                    align: this.actionsAlign,
                    sortable: false,
                    action: true
                })
            },
            fixActions () {
                let actions = _.clone(this.actions)

                this.fixedActions = actions.map(action => {
                    let {icon = '', text = '', color = 'primary', dark = false, flat = false, granted = true} = action

                    if (granted !== true) {
                        let fun = this.getParentMethod(granted)
                        if (fun) {
                            granted = fun
                        }
                    } else {
                        granted = item => true
                    }

                    action.icon = icon
                    action.text = text
                    action.color = color
                    action.dark = dark
                    action.flat = flat
                    action.granted = granted
                    return action
                })
            },
            renderField (item, field) {
                let value = item[field.value]
                let display = field.display
                if (!display) {
                    return value
                }

                return this.callParentMethod(display, value, item)
            },
            page (page) {
                this.load({
                    page: page
                })
            },
            showAction (action, item) {
                let show = true
                if (action.granted) {
                    show = this.callParentMethod(action.granted, item)
                }

                if (show) {
                    this.showActions = true
                }

                return show
            },

            getParentMethod (method) {
                if (typeof method === 'function') {
                    return method
                }
                let m = this.$parent[method]
                if (m && typeof m === 'function') {
                    return m
                }
                return false
            },
            callParentMethod (method, ...args) {
                let m = this.getParentMethod(method)
                if (m) {
                    return m.call(this.$parent, ...args)
                }
                return m
            },
            clickField (item, field, row) {
                let value = item[field.value]
                let click = field.click
                if (click) {
                    this.callParentMethod(click, value, item)
                } else  {
                    this.selectRow(row)
                }
            },
            refresh () {
                this.refreshing = true
                this.pagination.sortBy = null
                return this.load({
                    per_page: this.pageSize,
                    page: 1,
                    sort: null
                })
            },
            resolveSort (pagination) {
                if (pagination.sortBy) {
                    let key = pagination.sortBy
                    key += pagination.descending ? '|desc' : '|asc'
                    return key
                }
                return undefined
            },
            selectRow(row) {
                this.selected = [];
                this.selectable && (this.selected = [row.item]);
            },
            buildFilters(filters, name = 'filters') {
                let clone = _.clone(filters);
                let result = {};
                for (let k in clone) {
                    if (clone.hasOwnProperty(k) && [null, '', undefined].indexOf(clone[k]) < 0) {
                        let key = `${name}[${k}]`;
                        result[key] = clone[k];
                    }
                }
                return result;
            }
        },
        mounted () {
            this.formatHeaders()
            this.fixActions()
            this.apiUrl && this.load({})
        },
        created () {

        },
        watch: {
            pagination (now) {
                if (now.sortBy) {
                    this.load({})
                }
            }
        }
    }
</script>
