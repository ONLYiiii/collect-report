import axios from 'axios'

const apiService = {
  async postLogin(params) {
    try {
      const response = await axios.post(`/api/manage/login/auth/login`, {
        pid: params,
      })
      return response.data
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },

  async getLogin() {
    try {
      const response = await axios.get(`/api/manage/login/auth/profile`)
      return response
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },

  async getCCAATTMM(cc, aa) {
    let endpoint = `/api/manage/tabdb/ccaattmm/${cc}`
    if (![undefined, ''].includes(aa)) {
      endpoint += `/${aa}`
    }
    try {
      const response = await axios.get(endpoint)
      return response.data
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },

  async getRcode(aa) {
    let endpoint = `/api/manage/tabdb/rcode/${aa}`
    try {
      const response = await axios.get(endpoint)
      console.log('response.data :>> ', response.data)
      return response.data
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },

  async getReqCollect(reg, subreg, rcode, id) {
    try {
      const response = await axios.get(`/api/collect/request/api-collect-request/${reg}/${subreg}/${rcode}/${id}`)
      return response.data
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },

  //ccaattmm
  async getAA(cc) {
    if (cc)
      try {
        return (await axios.get(`/api/manage/tabdb/ccaattmm/${cc}`)).data
      } catch (error) {
        return { status: error.response.data.statusCode }
      }
    return []
  },
  async getTT(cc, aa) {
    if (cc && aa)
      try {
        return (await axios.get(`/api/manage/tabdb/ccaattmm/${cc}/${aa}`)).data
      } catch (error) {
        return { status: error.response.data.statusCode }
      }
    return []
  },

  //
  async getTitle() {
    try {
      return (await axios.get(`/api/manage/tabdb/title`)).data
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },
  async getOccu() {
    try {
      return (await axios.get(`/api/manage/tabdb/occu`)).data
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },
  async getNat() {
    try {
      return (await axios.get(`/api/manage/tabdb/nat`)).data
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },
  async getDate() {
    try {
      return (await axios.get(`/api/manage/center/system/date/time`)).data
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },
  async getSign(Rcode) {
    try {
      return (await axios.get(`/api/manage/center/employee/sign/7/${Rcode}`))
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },


  //api
  async importCollect(data) {
    try {
      return (await axios.post(`/api/collect/manage/license/importLicense`, data))
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },
  async getCollect(LicSubReg, LicCode) {
    try {
      return (await axios.get(`/api/collect/license/${LicSubReg}/${LicCode}`)).data
    } catch (error) {
      return { status: error.response.request.status }
    }
  },
  async getCollectID(LicSubReg, LicCode, LicID) {
    ///api/collect/manage/license/findLicInfoByLicId/
    try {
      return (await axios.get(`/api/collect/license/${LicSubReg}/${LicCode}/${LicID}`)).data
    } catch (error) {
      return { status: error.response.request.status }
    }
  },
  async getRqID(rcode, subreg, Year, No) {
    try {
      return (await axios.get(`/api/collect/manage/request/selectByRequestId/${rcode}/${subreg}/${Year}/${No}`)).data
    } catch (error) {
      return { status: error.response.request.status }
    }
  },
  async lastLicID(docPlace, docType) {
    try {
      return (await axios.get(`/api/manage/center/docctl/last/${docPlace}/7/${docType}`)).data
    } catch (error) {
      return { status: error.response.request.status }
    }
  }
}

export default apiService
