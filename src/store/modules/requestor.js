class Requestor {
  constructor() {
    this.applicantType = null
    this.business = {
      busId: '',
      busName: null,
      busType: null,
      busRegister: '',
      busRegNo: '',
      establishDate: '',
      hid: '',
      hno: '',
      mm: null,
      buildingName: '',
      floor: '',
      village: '',
      trok: '',
      soi: '',
      thanon: '',
      cc: null,
      aa: null,
      tt: null,
      hrcode: null,
      postCode: '',
      telNo: '',
      faxNo: '',
      email: '',
    }
    this.requestor = new PersonRequestor()
  }
}

class PersonRequestor {
  constructor() {
    this.recSeq = null
    this.committeeType = ''
    this.pid = ''
    this.identifyDoctype = 0
    this.identifyDocid = ''
    this.title = null
    this.fname = ''
    this.mname = ''
    this.lname = ''
    this.age = ''
    this.sex = null
    this.dob = null
    this.nat = null
    this.race = null
    this.religion = null
    this.occu = null
    this.income = ''
    this.faname = ''
    this.maname = ''
    this.hid = ''
    this.hno = ''
    this.mm = null
    this.buildingName = ''
    this.floor = ''
    this.village = ''
    this.trok = ''
    this.soi = ''
    this.thanon = ''
    this.cc = null
    this.aa = null
    this.tt = null
    this.hrcode = null
    this.postCode = ''
    this.telNo = ''
    this.faxNo = ''
    this.mobileNo = ''
    this.pidRcode = null
    this.pidAa = null
    this.pidCc = null
    this.grantFlag = 0
    this.grantPid = ''
    this.grantidentifyDoctype = null
    this.grantidentifyDocid = ''
    this.grantTitle = null
    this.grantTitleFlag = null
    this.grantFlName = ''
  }
}

export default Requestor
