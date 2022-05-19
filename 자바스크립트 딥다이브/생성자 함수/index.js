function createUser(name, role) {
  this.name = name;
  this.role = role;
}

const me = new createUser("kim", "developer");

console.log(me.name, me.role);
