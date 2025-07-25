export class StudentData {
  constructor(rollNo, chatid, email) {
    this.id = chatid;
    this.email = email;
    this.rollNo = rollNo;
  }

  completeStudentData() {
    return {
      id: this.id,
      email: this.email,
      rollNo: this.rollNo,
    };
  }
}
