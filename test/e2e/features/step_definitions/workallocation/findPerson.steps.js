var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseRolesAndAccessPage = require("../../pageObjects/workAllocation/caseRolesAccessPage");

const ArrayUtil = require('../../../utils/ArrayUtil');
const workflowUtil = require('../../pageObjects/common/workflowUtil');

const exclusionWorkFlow = require("../../pageObjects/workAllocation/exclusionRolesWorkFlow");
const findPersonPage = require('../../pageObjects/workAllocation/common/findPersonComponent');

defineSupportCode(function ({ And, But, Given, Then, When }) {

  
 


    Then('In workflow {string}, I see find person page displayed with caption {string}', async function (workflow,findPersonCaption) {
        const workFlowPage = workflowUtil.getWorlflowPageObject(workflow);
        expect(await workFlowPage.findPersonPage.amOnPage()).to.be.true;
        expect(await workFlowPage.findPersonPage.getHeaderCaption()).to.contains(findPersonCaption);
    });

    When('In workflow {string}, I enter search term {string} in find person input text', async function (workflow,searchterm) {
        const workFlowPage = workflowUtil.getWorlflowPageObject(workflow);
        await workFlowPage.findPersonPage.inputSearchTerm(searchterm);
    });

    Then('In workflow {string}, I see following options available in find person results', async function (workflow,findPersonResultsDatatable) {
        const workFlowPage = workflowUtil.getWorlflowPageObject(workflow);

        await workFlowPage.findPersonPage.isSearchResultSelectionContainerDisplayed()

        const resultHashes = findPersonResultsDatatable.hashes();
        const softAssert = new SoftAssert();
        for (let i = 0; i < resultHashes.length; i++) {
            softAssert.setScenario(`Is result "${resultHashes[i].value}" displayed`);
            await softAssert.assert(async () => expect(await workFlowPage.findPersonPage.isPersonReturned(resultHashes[i].value)).to.be.true);
        }
        softAssert.finally();

    });

    When('In workflow {string}, I select find person result {string}', async function (workflow,person) {
        const workFlowPage = workflowUtil.getWorlflowPageObject(workflow);
        await workFlowPage.findPersonPage.selectPerson(person);
    });

    Then('In workflow {string}, I see find person is selected with {string}', async function (workflow,person) {
        const workFlowPage = workflowUtil.getWorlflowPageObject(workflow);
        expect(await workFlowPage.findPersonPage.isPersonSelected(person), `${person} is not selected`).to.be.true;
    });


});