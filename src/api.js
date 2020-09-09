const axios = require('axios')
const {
  GITHUB_AUTH_HEADER,
  GITHUB_API_URL,
  SLACK_WEBHOOK_URL,
  SLACK_CHANNEL,
} = require('./constants.js')
const { GITHUB_REPOSITORY } = process.env

function getPRs() {
  console.log('process.env', process.env)

  if (!GITHUB_REPOSITORY)
    throw new Error('No GitHub repository supplied - pull requests cannot be retrieved.')

  return axios({
    method: 'GET',
    url: `${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/pulls`,
    headers: GITHUB_AUTH_HEADER,
  })
}

function postSlackMsg({ text, blocks } = {}) {
  if (!SLACK_WEBHOOK_URL)
    throw new Error('No SLACK_WEBHOOK_URL supplied - messages cannot be posted.')

  if (!SLACK_CHANNEL) throw new Error('No SLACK_CHANNEL supplied - messages cannot be posted.')

  return axios({
    method: 'POST',
    url: SLACK_WEBHOOK_URL,
    data: {
      channel: SLACK_CHANNEL,
      username: 'Review Badger',
      text,
      blocks,
    },
  })
}

module.exports = {
  getPRs,
  postSlackMsg,
}
