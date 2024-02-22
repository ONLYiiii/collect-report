class Personal {
  constructor() {
    this.rqReg = 0,
    this.rqSubreg = 0,
    this.rqRcode = 0,
    this.rqId = 0,
    this.rqDate = 0,
    this.applicantType = 0,
    this.busId = 0,
    this.busRegno = '',
    this.busName = '',
    this.busBuildingName =  '',
    this.busFloor =  '',
    this.busVillage =  '',
    this.busHid = 0,
    this.busHrcode =     '',
    this.busCcaattmm = 0,
    this.busHno =  '',
    this.busTrok =  '',
    this.busSoi =  '',
    this.busThanon =  '',
    this.busPostCode = 0,
    this.busTelNo =  '',
    this.busFaxNo =  '',
    this.busEmail =  '',
    this.pid = 0,
    this.identifyDoctype = 0,
    this.identifyDocissue = '',
    this.identifyAa =  '',
    this.identifyCc =  '',
    this.identifyDocid =  '',
    this.title = 0,
    this.firstName = '',
    this.middleName =  '',
    this.lastName = '',
    this.sex = 0,
    this.dateOfBirth = 0,
    this.age = 0,
    this.nationality = 0,
    this.race = 0,
    this.occu = 0,
    this.income =  '',
    this.hid = 0,
    this.hrcode = '',
    this.ccaattmm = 0,
    this.buildingName =  '',
    this.floor =  '',
    this.village =  '',
    this.hno = '',
    this.trok =  '',
    this.soi = '',
    this.thanon = '',
    this.postCode = 0,
    this.telNo =  '',
    this.faxNo =  '',
    this.mobileNo =  '',
    this.grantFlag = 0,
    this.grantPid = 0,
    this.grantTitle =  '',
    this.grantTitleFlag = 0,
    this.grantIdentifyDocid =  '',
    this.grantName =  '',
    this.objcopyCode = 0,
    this.recStatus = 0,
    this.imageFlag = 0,
    this.printPage = 0,
    this.qrcodeSeq = 0,
    this.rejectReason =  '',
    this.remark =  '',
    this.approveNo =  '',
    this.approveDate = 0,
    this.approveReqDate = 0,
    this.approveName =  '',
    this.approvePosition =  '',
    this.cancelCode = 0,
    this.cancelDate = 0,
    this.cancelCause =  '',
    this.uncancelDate = 0,
    this.uncancelCause =  '',
    this.empName = '',
    this.empTitle = '',
    this.empTitleFlag = 0,
    this.empPosition = '',
    this.updateEmp = 0,
    this.updateDate = 0,
    this.updateTime = 0,
    this.fatherName = '',
    this.motherName = '',
    this.religion = 0,
    this.approveTitle =  '',
    this.approveTitleFlag = 0,
    this.cancelEmp = 0
    this.reqLicinfo = null
    this.reqMemlist = null

    this.aaDescription = new DescriptionInfo()
    this.ccDescription = new DescriptionInfo()
    this.natDescription = new DescriptionInfo()
    this.raceDescription = new DescriptionInfo()
    this.rqRcodeCcDescription = new DescriptionInfo()
    this.rqRcodeDescription = new DescriptionInfo()
    this.titleDescription = new DescriptionInfo()
    this.ttDescription = new DescriptionInfo()
    this.occuDescription = new DescriptionInfo()
  }
}

class DescriptionInfo {
  constructor() {
    this.description = ''
    this.descriptionEnglish = ''
  }
}

export default Personal
