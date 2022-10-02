#!/bin/bash

set -e

rm -fr chrome-aws-lambda
git clone --depth=1 https://github.com/alixaxel/chrome-aws-lambda.git && \
cd chrome-aws-lambda && \
make ../layer/chrome.zip

cd .. && rm -fr chrome-aws-lambda

echo "$LAYER created successfully!"
echo "Upload https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html"
