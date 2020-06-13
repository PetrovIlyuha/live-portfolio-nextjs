class User {
  constructor(model) {
    this.Model = model;
  }
  signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Passwords don't match");
    }
    return this.Model.create(signUpData);
  }
  async signIn(signInData, ctx) {
    try {
      const user = await ctx.authenticate(signInData);
      return user;
    } catch (error) {
      return error;
    }
  }
  signOut(ctx) {
    try {
      ctx.logout();
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = User;
