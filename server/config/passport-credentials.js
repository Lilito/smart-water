module.exports = {
    'ldapauth' : {
        'url' : 'ldaps://bluepages.ibm.com:636',
        'searchBase' : 'o=ibm.com',
        'searchFilter' : '(&(mail={{username}})(objectclass=person))'
    },
    'facebookauth' : {
      'clientID'      : '965295466864087', // your App ID
      'clientSecret'  : '9e6230d08ec1b4dbf881404468553743', // your App Secret
      'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'googleauth' : {
        'clientID'      : '232019441309-hone0mbf7rrsvvv3m365u5u16633dofa.apps.googleusercontent.com', // your App ID
        'clientSecret'  : 't_LBywHwIgnHot0MmqGo0gce', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }
};
