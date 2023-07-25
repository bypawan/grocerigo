enum Environments {
  localEnvironment = "local",
  devEnvironment = "dev",
  prodEnvironment = "prod",
  qaEnvironment = "qa",
}

class Environment {
  private environment: String;

  constructor(environment: String) {
    this.environment = environment;
  }

  getPort(): Number {
    if (this.environment === Environments.prodEnvironment) {
      return 8081;
    } else if (this.environment === Environments.devEnvironment) {
      return 8082;
    } else if (this.environment === Environments.qaEnvironment) {
      return 8083;
    } else {
      return 8000;
    }
  }

  getDBName(): String {
    if (this.environment === Environments.prodEnvironment) {
      return "dbTestProjectProd";
    } else if (this.environment === Environments.devEnvironment) {
      return "dbTestProjectDev";
    } else if (this.environment === Environments.qaEnvironment) {
      return "dbTestProjectQa";
    } else {
      return "dbTestProjectLocal";
    }
  }
}

const defaultInstance = new Environment(Environments.localEnvironment)

export default defaultInstance;
