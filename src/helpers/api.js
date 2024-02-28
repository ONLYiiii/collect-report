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
  async getReport(Rcode, Start, End, Subreg, Year, No) {
    let api = `/api/collect/manage/request/reportAccSearch/${Rcode}/${Start}/${End}?`
    if (Subreg) {
      api = api + `subreg=${Subreg}&`
    }
    if (Year) {
      api = api + `year=${Year}&`
    }
    if (No) {
      api = api + `no=${No}`
    }
    try {
      return (await axios.get(api))
    } catch (error) {
      return { status: error.response.data.statusCode }
    }
  },
  async getAccount(SubReg, Rcode, LicID) {
    try {
      return (await axios.get(`/api/collect/manage/request/reportAccountList/${SubReg}/${Rcode}/${LicID}`)).data
    } catch (error) {
      return { status: error.response.request.status }
    }
  },
  async getAccSet(SubReg, Rcode, LicID, AccSet) {
    try {
      return (await axios.get(`/api/collect/manage/request/reportAccSetList/${SubReg}/${Rcode}/${LicID}/${AccSet}`)).data
    } catch (error) {
      return { status: error.response.request.status }
    }
  },
  async getLicense(SubReg, Rcode, LicID) {
    try {
      return (await axios.get(`/api/collect/manage/request/reportLicDetail/${SubReg}/${Rcode}/${LicID}`)).data
    } catch (error) {
      return { status: error.response.request.status }
    }
  },
  async getPhoto(SubReg, Rcode, LicID, AccSet, AccNo) {
    try {
      return (await axios.get(`/api/collect/manage/request/reportAccSetByNo/${SubReg}/${Rcode}/${LicID}/${AccSet}/${AccNo}`)).data
    } catch (error) {
      return { status: error.response.request.status }
    }
  }
}

export default apiService
