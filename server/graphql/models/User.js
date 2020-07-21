const BaseModel = require('./BaseModel');

class User extends BaseModel {
  constructor(model, user) {
    super(model);
  }

  getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      return ctx.getUser();
    }
    return null;
  }

  async signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Passwords don't match");
    } else if (!signUpData.username.trim()) {
      throw new Error('You may want to enjoy using Username');
    } else if (!signUpData.email.trim()) {
      throw new Error("Don't forget to provide your e-mail");
    }
    return await this.Model.create(signUpData);
  }

  async signIn(signInData, ctx) {
    const user = await ctx.authenticate(signInData);
    return user;
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
