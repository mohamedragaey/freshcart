// CookiesStorageService.js
import Cookies from 'js-cookie'

const CookiesStorageService = (function () {
  let _service

  function _getService () {
    if (!_service) {
      _service = this
      return _service
    }
    return _service
  }

  function _setToken (accessToken) {
    Cookies.set('access_token', accessToken)
  }

  function _setUserInfo (user) {
    Cookies.set('user', user)
  }

  function _getUserInfo () {
    return Cookies.get('user')
  }

  function _getAccessToken () {
    return Cookies.get('access_token')
  }

  function _clearToken () {
    Cookies.remove('access_token')
    Cookies.remove('user')
  }

  return {
    getService: _getService,
    setToken: _setToken,
    setUserInfo: _setUserInfo,
    getUserInfo: _getUserInfo,
    getAccessToken: _getAccessToken,
    clearToken: _clearToken
  }
})()

export default CookiesStorageService
