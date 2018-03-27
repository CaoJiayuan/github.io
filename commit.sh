#!/usr/bin/env bash
DIST_PATH=../github-blog-dist
MSG=$1
if [ "$MSG" == "" ]; then
	echo -e "The commit message is required.\nUsage: $0 message"
	exit 1
fi

npm run build
cd ${DIST_PATH}

git add .
git commit -m "$MSG"
git push
