/*jslint devel: true, node: true, nomen: true, plusplus: true, sloppy: true, vars: true, indent: 4, maxerr: 50, es5: true*/
/*jshint multistr: true, esnext: true */
/* global -Promise */

"use strict";

const easysoap = require('easysoap');
const _ = require("underscore");

const defaultArgs = {
        params: {},
        method: '',
        attributes: {
            xmlns: 'http://smsc.vianett.no/CPA/'
        }
};

const Promise = require('bluebird');


const VIANETT_OPTS = {
        'host': 'smsc.vianett.no',
        'path': '/v3/cpa/cpawebservice.asmx',
        'wsdl': '/v3/cpa/cpawebservice.asmx?WSDL'
};

const soapClient = easysoap.createClient(VIANETT_OPTS);

class Client {

    constructor(options) {
        this.options = options;
        if (!this.options.username || !this.options.password) {
            throw new Error("You have to provide a username and password");
        }
        this.soapClient = soapClient;
    }

    AddUser(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'SgAddUser';
        args.params.username = this.options.username;
        args.params.password = this.options.password;
        if (!args.params.groupId) {
            throw new Error("You have to provide a valid group id (groupId)");
        }
        if (!args.params.tel) {
            throw new Error("You have to provide a valid phone number (tel)");
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.SgAddUserResponse.SgAddUserResult === '1' ? true : false;
            }
        });
    }

    DeleteUser(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'SgDeleteUser';
        args.params.username = this.options.username;
        args.params.password = this.options.password;
        if (!args.params.groupId) {
            throw new Error("You have to provide a valid group id (groupId)");
        }
        if (!args.params.tel) {
            throw new Error("You have to provide a valid phone number (tel)");
        }
	if (!args.params.name) {
	    args.params.name = '';
	}

        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.SgDeleteUserResponse.SgDeleteUserResult === '1' ? true : false;
            }
        });
    }

    CreateGroup(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'SgCreateGroup';
        args.params.username = this.options.username;
        args.params.password = this.options.password;
        if (!args.params.name) {
            throw new Error("You have to provide a valid group name (name)");
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.SgCreateGroupResponse.SgCreateGroupResult;
            }
        });
    }

    DeleteGroup(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'SgDeleteGroup';
        args.params.username = this.options.username;
        args.params.password = this.options.password;
        if (!args.params.groupId) {
            throw new Error("You have to provide a valid groupId (groupId)");
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.SgDeleteGroupResponse.SgDeleteGroupResult;
            }
        });
    }

    createCampaign(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'createCampaign';
        args.params.UserName = this.options.username;
        args.params.PassWord = this.options.password;
        if (!args.params.CampaignName) {
            throw new Error("You have to provide a valid campaign name (CampaignName)");
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.createCampaignResponse.createCampaignResult;
            }
        });
    }

    CreateMessage(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'SgCreateMessage';
        args.params.username = this.options.username;
        args.params.password = this.options.password;
        if (!args.params.groupIds) {
            throw new Error("You have to provide a valid group id (groupIds)");
        }
        if (!args.params.description) {
            throw new Error("You have to provide a message description (description)");
        }
        if (!args.params.fromAddress) {
            throw new Error("You have to provide a valid sender address (fromAddress)");
        }
        if (!args.params.message) {
            throw new Error("You have to provide some message content (message)");
        }
        if (!args.params.pricegroup) {
            args.params.pricegroup = 0;
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.SgCreateMessageResponse.SgCreateMessageResult;
            }
        });

    }

    SendSMS_Advanced1(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'SendSMS_Advanced1';
        args.params.UserName = this.options.username;
        args.params.PassWord = this.options.password;
        if (!args.params.MsgID) {
            throw new Error("You have to provide a unique message id (MsgID)");
        }
        if (!args.params.FromNr) {
            throw new Error("You have to provide a sender number (FromNr)");
        }
        if (!args.params.Tel) {
            throw new Error("You have to provide a valid recipient (Tel)");
        }
        if (!args.params.Msg) {
            throw new Error("You have to provide some message content (Msg)");
        }
        if (!args.params.CampaignID) {
            throw new Error("You have to provide a valid campaign ID (CampaignID)");
        }
        if (!args.params.FromAlpha) {
            args.params.FromAlpha = args.params.FromNr;
        }
        if (!args.params.PriceGroup) {
            args.params.PriceGroup = 0;
        }
        if (!args.params.Nrq) {
            args.params.Nrq = 0;
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.SendSMS_Advanced1Response.SendSMS_Advanced1Result;
            }
        });
    }

    SendSMS_Advanced2(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'SendSMS_Advanced2';
        args.params.UserName = this.options.username;
        args.params.PassWord = this.options.password;
        if (!args.params.MsgID) {
            throw new Error("You have to provide a unique message id (MsgID)");
        }
        if (!args.params.FromNr) {
            throw new Error("You have to provide a sender number (FromNr)");
        }
        if (!args.params.Tel) {
            throw new Error("You have to provide a valid recipient (Tel)");
        }
        if (!args.params.Msg) {
            throw new Error("You have to provide some message content (Msg)");
        }
        if (!args.params.CampaignID) {
            throw new Error("You have to provide a valid campaign ID (CampaignID)");
        }
        if (!args.params.FromAlpha) {
            args.params.FromAlpha = args.params.FromNr;
        }
        if (!args.params.PriceGroup) {
            args.params.PriceGroup = 0;
        }
        if (!args.params.Nrq) {
            args.params.Nrq = 0;
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.SendSMS_Advanced2Response.SendSMS_Advanced2Result;
            }
        });
    }

    SendSMS_Advanced3(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'SendSMS_Advanced3';
        args.params.UserName = this.options.username;
        args.params.PassWord = this.options.password;
        if (!args.params.MsgID) {
            throw new Error("You have to provide a unique message id (MsgID)");
        }
        if (!args.params.FromNr) {
            throw new Error("You have to provide a sender number (FromNr)");
        }
        if (!args.params.Tel) {
            throw new Error("You have to provide a valid recipient (Tel)");
        }
        if (!args.params.Msg) {
            throw new Error("You have to provide some message content (Msg)");
        }
        if (!args.params.CampaignID) {
            throw new Error("You have to provide a valid campaign ID (CampaignID)");
        }
        if (!args.params.FromAlpha) {
            args.params.FromAlpha = args.params.FromNr;
        }
        if (!args.params.PriceGroup) {
            args.params.PriceGroup = 0;
        }
        if (!args.params.Nrq) {
            args.params.Nrq = 0;
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.SendSMS_Advanced3Response.SendSMS_Advanced3Result;
            }
        });
    }

    SendSMS_Bulk(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'SendSMS_Bulk';
        args.params.username = this.options.username;
        args.params.password = this.options.password;
        if (!args.params.msgId) {
            throw new Error("You have to provide a unique message id (msgId)");
        }
        if (!args.params.fromNr) {
            throw new Error("You have to provide a sender number (fromNr)");
        }
        if (!args.params.tels) {
            throw new Error("You have to provide a valid recipient (tels)");
        }
        if (!args.params.msg) {
            throw new Error("You have to provide some message content (msg)");
        }
//        if (!args.params.campaign) {
//            throw new Error("You have to provide a valid campaign ID (campaign)");
//        }
        if (!args.params.fromAlpha) {
            args.params.fromAlpha = args.params.fromNr;
        }
        if (!args.params.pricegroup) {
            args.params.pricegroup = 0;
        }
        if (!args.params.nrq) {
            args.params.nrq = 0;
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.SendSMS_BulkResponse.SendSMS_BulkResult;
            }
        });
    }

    bindCampaignToConnection(params) {
        var args = _.extend(_.clone(defaultArgs), { params: params || {} });
        args.method = 'bindCampaignToConnection';
        args.params.UserName = this.options.username;
        args.params.PassWord = this.options.password;
        if (!args.params.ConnectionID) {
            throw new Error("You have to provide a valid connection id (ConnectionID)");
        }
        if (!args.params.CampaignID) {
            throw new Error("You have to provide a valid campaign id (CampaignID)");
        }
        return sendRequest(args, function(response) {
            if (response.data.Fault) {
                throw new Error(response.data.Fault[0].faultstring);
            }
            else {
                return response.data.bindCampaignToConnectionResponse.bindCampaignToConnectionResult;
            }
        });
    }

}

function sendRequest(args, normalize) {
        return soapClient.call(args).then(normalize);
}

module.exports = Client;
