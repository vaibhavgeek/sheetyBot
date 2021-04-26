let message = {
  sender: 545485074,
  text: '/start',
  originalRequest: {
    update_id: 403385039,
    message: {
      message_id: 8,
      from: {
        id: 545485074,
        is_bot: false,
        first_name: 'Vaibhav',
        last_name: 'Maheshwari',
        username: 'ayeayecapt3n',
        language_code: 'en'
      },
      chat: {
        id: 545485074,
        first_name: 'Vaibhav',
        last_name: 'Maheshwari',
        username: 'ayeayecapt3n',
        type: 'private'
      },
      date: 1618821516,
      text: '/start',
      entities: [
        {
          offset: 0,
          length: 6,
          type: 'bot_command'
        }
      ]
    }
  },
  type: 'telegram'
};

let originalApiRequest =
{
  v: 3,
  rawBody: '{"update_id":403385039,\n' +
    '"message":{"message_id":8,"from":{"id":545485074,"is_bot":false,"first_name":"Vaibhav","last_name":"Maheshwari","username":"ayeayecapt3n","language_code":"en"},"chat":{"id":545485074,"first_name":"Vaibhav","last_name":"Maheshwari","username":"ayeayecapt3n","type":"private"},"date":1618821516,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}}',
  normalizedHeaders: {
    'accept-encoding': 'gzip, deflate',
    'cloudfront-forwarded-proto': 'https',
    'cloudfront-is-desktop-viewer': 'true',
    'cloudfront-is-mobile-viewer': 'false',
    'cloudfront-is-smarttv-viewer': 'false',
    'cloudfront-is-tablet-viewer': 'false',
    'cloudfront-viewer-country': 'AG',
    'content-type': 'application/json',
    host: 'yi1c4otoma.execute-api.ap-south-1.amazonaws.com',
    'user-agent': 'Amazon CloudFront',
    via: '1.1 59f36941a67a8e6b953ddc861721052b.cloudfront.net (CloudFront)',
    'x-amz-cf-id': 'cPr44_-5f10E0jUUmDYe9AcF-zl67AuB2mJSO6W_H6a7TNMQLXcQRg==',
    'x-amzn-trace-id': 'Root=1-607d4191-6aba63453084d909312f7e8a',
    'x-forwarded-for': '91.108.6.32, 64.252.152.96',
    'x-forwarded-port': '443',
    'x-forwarded-proto': 'https'
  },
  lambdaContext: {
    functionVersion: '$LATEST',
    functionName: 'messagingbot',
    memoryLimitInMB: '128',
    logGroupName: '/aws/lambda/messagingbot',
    logStreamName: '2021/04/19/[$LATEST]d5a0d3f281854b82877a9ceeb777e1d5',
    clientContext: undefined,
    identity: undefined,
    invokedFunctionArn: 'arn:aws:lambda:ap-south-1:015953464989:function:messagingbot:latest',
    awsRequestId: '830fb142-2f63-47cd-8988-9bb3076e1f9b',
  },
  proxyRequest: {
    resource: '/telegram',
    path: '/telegram',
    httpMethod: 'POST',
    headers: {
      'Accept-Encoding': 'gzip, deflate',
      'CloudFront-Forwarded-Proto': 'https',
      'CloudFront-Is-Desktop-Viewer': 'true',
      'CloudFront-Is-Mobile-Viewer': 'false',
      'CloudFront-Is-SmartTV-Viewer': 'false',
      'CloudFront-Is-Tablet-Viewer': 'false',
      'CloudFront-Viewer-Country': 'AG',
      'Content-Type': 'application/json',
      Host: 'yi1c4otoma.execute-api.ap-south-1.amazonaws.com',
      'User-Agent': 'Amazon CloudFront',
      Via: '1.1 59f36941a67a8e6b953ddc861721052b.cloudfront.net (CloudFront)',
      'X-Amz-Cf-Id': 'cPr44_-5f10E0jUUmDYe9AcF-zl67AuB2mJSO6W_H6a7TNMQLXcQRg==',
      'X-Amzn-Trace-Id': 'Root=1-607d4191-6aba63453084d909312f7e8a',
      'X-Forwarded-For': '91.108.6.32, 64.252.152.96',
      'X-Forwarded-Port': '443',
      'X-Forwarded-Proto': 'https'
    },
    multiValueHeaders: {
      'Accept-Encoding': [
        'gzip, deflate'
      ],
      'CloudFront-Forwarded-Proto': [
        'https'
      ],
      'CloudFront-Is-Desktop-Viewer': [
        'true'
      ],
      'CloudFront-Is-Mobile-Viewer': [
        'false'
      ],
      'CloudFront-Is-SmartTV-Viewer': [
        'false'
      ],
      'CloudFront-Is-Tablet-Viewer': [
        'false'
      ],
      'CloudFront-Viewer-Country': [
        'AG'
      ],
      'Content-Type': [
        'application/json'
      ],
      Host: [
        'yi1c4otoma.execute-api.ap-south-1.amazonaws.com'
      ],
      'User-Agent': [
        'Amazon CloudFront'
      ],
      Via: [
        '1.1 59f36941a67a8e6b953ddc861721052b.cloudfront.net (CloudFront)'
      ],
      'X-Amz-Cf-Id': [
        'cPr44_-5f10E0jUUmDYe9AcF-zl67AuB2mJSO6W_H6a7TNMQLXcQRg=='
      ],
      'X-Amzn-Trace-Id': [
        'Root=1-607d4191-6aba63453084d909312f7e8a'
      ],
      'X-Forwarded-For': [
        '91.108.6.32, 64.252.152.96'
      ],
      'X-Forwarded-Port': [
        '443'
      ],
      'X-Forwarded-Proto': [
        'https'
      ]
    },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: {
      telegramAccessToken: '1765295947:AAExyL9QE39Thb3sS5pHmpmSG49lGWG6UFM',
      lambdaVersion: 'latest'
    },
    requestContext: {
      resourceId: 'smfoum',
      resourcePath: '/telegram',
      httpMethod: 'POST',
      extendedRequestId: 'eBcuyFR5BcwFZjQ=',
      requestTime: '19/Apr/2021:08:38:41 +0000',
      path: '/latest/telegram',
      accountId: '015953464989',
      protocol: 'HTTP/1.1',
      stage: 'latest',
      domainPrefix: 'yi1c4otoma',
      requestTimeEpoch: 1618821521783,
      requestId: '0608a10a-2620-4220-b69d-f89d290b7500',
      identity: {
        cognitoIdentityPoolId: null,
        accountId: null,
        cognitoIdentityId: null,
        caller: null,
        sourceIp: '91.108.6.32',
        principalOrgId: null,
        accessKey: null,
        cognitoAuthenticationType: null,
        cognitoAuthenticationProvider: null,
        userArn: null,
        userAgent: 'Amazon CloudFront',
        user: null
      },
      domainName: 'yi1c4otoma.execute-api.ap-south-1.amazonaws.com',
      apiId: 'yi1c4otoma'
    },
    body: '{"update_id":403385039,\n' +
      '"message":{"message_id":8,"from":{"id":545485074,"is_bot":false,"first_name":"Vaibhav","last_name":"Maheshwari","username":"ayeayecapt3n","language_code":"en"},"chat":{"id":545485074,"first_name":"Vaibhav","last_name":"Maheshwari","username":"ayeayecapt3n","type":"private"},"date":1618821516,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}}',
    isBase64Encoded: false
  },
  queryString: {},
  env: {
    telegramAccessToken: '1765295947:AAExyL9QE39Thb3sS5pHmpmSG49lGWG6UFM',
    lambdaVersion: 'latest'
  },
  headers: {
    'Accept-Encoding': 'gzip, deflate',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'AG',
    'Content-Type': 'application/json',
    Host: 'yi1c4otoma.execute-api.ap-south-1.amazonaws.com',
    'User-Agent': 'Amazon CloudFront',
    Via: '1.1 59f36941a67a8e6b953ddc861721052b.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'cPr44_-5f10E0jUUmDYe9AcF-zl67AuB2mJSO6W_H6a7TNMQLXcQRg==',
    'X-Amzn-Trace-Id': 'Root=1-607d4191-6aba63453084d909312f7e8a',
    'X-Forwarded-For': '91.108.6.32, 64.252.152.96',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
  },
  pathParams: {},
  body: {
    update_id: 403385039,
    message: {
      message_id: 8,
      from: {
        id: 545485074,
        is_bot: false,
        first_name: 'Vaibhav',
        last_name: 'Maheshwari',
        username: 'ayeayecapt3n',
        language_code: 'en'
      },
      chat: {
        id: 545485074,
        first_name: 'Vaibhav',
        last_name: 'Maheshwari',
        username: 'ayeayecapt3n',
        type: 'private'
      },
      date: 1618821516,
      text: '/start',
      entities: [
        {
          offset: 0,
          length: 6,
          type: 'bot_command'
        }
      ]
    }
  },
  context: {
    method: 'POST',
    path: '/telegram',
    stage: 'latest',
    sourceIp: '91.108.6.32',
    accountId: null,
    user: null,
    userAgent: 'Amazon CloudFront',
    userArn: null,
    caller: null,
    apiKey: undefined,
    authorizerPrincipalId: null,
    cognitoAuthenticationProvider: null,
    cognitoAuthenticationType: null,
    cognitoIdentityId: null,
    cognitoIdentityPoolId: null,
    authorizer: undefined
  }
};

module.exports = { message, originalApiRequest };