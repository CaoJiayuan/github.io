import {routes} from '../router';


export default function (to, from, next) {
    setTitle(to);
    next()
}

function setTitle(route) {
    let title = route.meta.title;
    if (title){
        document.title = title
    }
}
