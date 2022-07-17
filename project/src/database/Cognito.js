// Pool ID: us-west-1_ZgopFe8iU
// Client ID: 14ml5nmitpm0d70082asluqdii
import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-west-1_ZgopFe8iU",
    ClientId: "14ml5nmitpm0d70082asluqdii"
}

export default new CognitoUserPool(poolData);