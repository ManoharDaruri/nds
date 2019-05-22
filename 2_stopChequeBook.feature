@ui-mock @api-mock @stop-cheque-book
Feature: Stop Cheque Book
  User should able to Request Stop Cheque Book
  #-----------------------------------------------------------------------------------------------------------------------
  @smoke-testing
  Scenario: Stop Cheque Book - Enter Details
    Given An authorised user with permission
    When The user navigated to the Create "Stop Cheque" service request screen
    Then The application must present the "Operating Accounts" selection dropdown which is defaulted to BLANK
    And The application must hide the further input fields to Request "Stop Cheque"
    When I click on the dropdown arrow against the "Operating Accounts" field
    Then The application will populate the "Operating Accounts" dropdown menu with all entitled "accounts"

    When The user types "something valid" into the "Operating Accounts" selection drop down
    Then The application pops up the drop-down list while typing, suggesting a list of possible results
    When The user types "something invalid" into the "Operating Accounts" selection drop down
    Then The application must display the error message 'No Matches Found' in the "Operating Accounts" dropdown
    When The user clicks on the lookup button for "Operating Accounts"
    Then The application will open the Search "Account" Lookup Dialog and show all the accounts I am entitled as per business rules
    When The user closes the Search "Account" dialog box
    Then The application must hide the further input fields to Request "Stop Cheque"
    When I have selected an account from Select Account Number Dropdown
    Then The application must display option to choose Types of Request & enter Cheque Details

    * For Acceptance Criteria "DIGS-634-1, DIGS-634-2"
    And The application must present Cheque Details table with label as "Cheque Details" and the message "Max 10 per request" below
    And Cheque Details has Add and Remove buttons
    When The user Clicks the "Add" button
    Then A new row is added to the Cheque Details table
    When The user selects all rows from the Cheque Details table
    And The user Clicks the "Remove" button

    * For Acceptance Criteria "DIGS-419-1, DIGS-419-2"
    Then The Cheque Details Table must be updated with a blank row

    When I am selecting "Cheque Book" as Request Type
    Then The application shows the "Cheque Book" section fields
    When The user clicks on the lookup button for "Operating Accounts"
    And I am selecting an eligible account from Search Account Lookup Dialog
    Then The application shows the "Cheque Book" section fields
    When The user Clicks the "Cancel" button
    Then The application must navigate to the "Cash Management Service Request" screen
  #-----------------------------------------------------------------------------------------------------------------------
  Scenario: Stop Cheque Book - Field Validation
    Given An authorised user with permission
    When The user navigated to the Create "Stop Cheque" service request screen
    And I have selected an account from Select Account Number Dropdown
    And I am selecting "Cheque Book" as Request Type
    And The user Clicks the "Review & Submit" button
    Then The application show error message on "Cheque Book Size" field
    And The application show error message on "First Serial Number" field
    When I am entering value "4333" in "First Serial Number"
    And The user Clicks the "Review & Submit" button
    * For Acceptance Criteria "DIGS-617-1"
    When I am selecting "26" from "First Serial Number" select dropdown
    And I am entering value "2333" in "First Serial Number"
    And The user Clicks the "Review & Submit" button
    Then The application show error message on "Cheque Book Size" field
  #-----------------------------------------------------------------------------------------------------------------------
  Scenario: Cheque Book - Successful Presented Cheques
    Given An authorised user with permission
    When The user navigated to the Create "Stop Cheque" service request screen
    And The user selects 'SCR-RANGE-SUCCESS-PRESENTED-CHEQ' from Select Account Number Dropdown
    And I am selecting "Cheque Book" as Request Type
    And I am selecting "100" in "Cheque Book Size"
    And I am entering value "01" in "First Serial Number"
    And I am selecting "01" from "First Serial Number" select dropdown
    And The user Clicks the "Review & Submit" button
    And The user Clicks the "Submit" button
    Then The application will display the Submit Response Dialog with status "Successful"
  #-----------------------------------------------------------------------------------------------------------------------
  Scenario: Cheque Book - Unsuccessful
    Given An authorised user with permission
    When The user navigated to the Create "Stop Cheque" service request screen
    And The user selects 'SCR-RANGE-UNSUCCESSFUL' from Select Account Number Dropdown
    And I am selecting "Cheque Book" as Request Type
    And I am selecting "100" in "Cheque Book Size"
    And I am entering value "01" in "First Serial Number"
    And I am selecting "01" from "First Serial Number" select dropdown
    And The user Clicks the "Review & Submit" button
    And The user Clicks the "Submit" button
    Then The application will display the Submit Response Dialog with status "Unsuccessful"
  #-----------------------------------------------------------------------------------------------------------------------
  @DIGS-206
  Scenario: Stop Cheque Book - View
    Given An authorised user with permission

    * For Acceptance Criteria "DIGS-206-01, DIGS-206-02, DIGS-206-10, DIGS-469"
    When The user navigated to the "Cash Management Service Requests" screen
    And The user opens "Advance Search Panel"
    And The user input "Request Type" with 'Stop Cheque' in Advance Search Panel
    And The user Clicks the "Search" button in Advance Search Panel
    Then The application must display the service request list screen

    When The user perform simple click on a service request in the list screen
    Then The application must present the selected "Stop Cheque" service request in non editable mode as per the field matrix
    And The application must present the required Actions buttons
    And The application must present the Summary information sub-section

    When The user selects to 'View Audit History' for the service request
    Then The application must present the audit popup as per the field matrix
    When The user selects to close the audit popup
    Then The application must close the audit popup and return the user to the Service Request view detail screen

    When The user selects to progress to the "Next Record"
    Then The application must move the view screen for the next Service Request record in the Service Request list as per the user's previous entered criteria

    When The user selects to progress to the "Previous Record"
    Then The application must move the view screen for the previous Service Request record in the Service Request list as per the user's previous entered criteria

    When The record the user is viewing is the first record selected from the Service Request List
    Then The application must disable the 'Previous Record' button
    When The user Clicks the "Close" button
    Then The application must navigate the user to the Service Request List screen and previous search must be presented

    When The user click the 'last' record on a service request in the list screen
    Then The application must disable the 'Next Record' button
    When The user Clicks the "Close" button
    Then The application must navigate to the "View Service Request List" screen
  #-----------------------------------------------------------------------------------------------------------------------
  Scenario: Stop Individual Cheque - Single / Multiple - Field Validation
    Given An authorised user with permission
    When The user navigated to the Create "Stop Cheque" service request screen
    And I have selected an account from Select Account Number Dropdown
    And I am selecting "Individual Cheque(s)" as Request Type
    And The user Clicks the "Review & Submit" button
    Then The application show error message on "Cheque Number", "Value" & "Issue Date" field in Cheque Details Row1
    When I am entering inputs into "Cheque Number", "Value", "Issue Date", "Payee Name" & "Note" in Cheque Detail
      | chqNum | chqAmt        | chqIssDt   | payeeName | note |
      | ABC    | 9999999999999 | 01/01/2100 | §§§       | §§§  |
    And The user Clicks the "Review & Submit" button
    Then The application show error message on "Cheque Number", "Value", "Issue Date" & "Payee Name" field in Cheque Details Row1
    When I am selecting "Individual Cheque(s)" as Request Type
    And The user Clicks the "Add" button "Twice" in Cheque Details section
    Then The application shows 3 Rows in Cheque Details
    When The user Clicks the "Add" button "7 Times" in Cheque Details section
    Then The application should disable Add Button
    And The application shows 10 Rows in Cheque Details
    When The user Clicks the "Select All" checkbox
    And The user Clicks the "Remove" button "Once" in Cheque Details section
    And The user Clicks the "Review & Submit" button
    Then The application shows error on Cheque Details section
    When The user Clicks the "Add" button "Twice" in Cheque Details section
    And The user Clicks the "Review & Submit" button
    Then The application show error message on "Cheque Number", "Value" & "Issue Date" field in Cheque Details Row1 & Row2
    When I am entering inputs into "Cheque Number", "Value", "Issue Date", "Payee Name" & "Note" in Cheque Detail
      | chqNum | chqAmt        | chqIssDt   | payeeName | note |
      | ABC    | 9999999999999 | 01/01/2100 | §§§       | §§§  |
      | ABC    | 9999999999999 | 01/01/2100 | §§§       | §§§  |
    And The user Clicks the "Review & Submit" button
    Then The application show error message on "Cheque Number", "Value", "Issue Date" & "Payee Name" field in Cheque Details Row1 & Row 2
  #-----------------------------------------------------------------------------------------------------------------------
  Scenario: Stop Individual Cheque - Single - Successful Request
    Given An authorised user with permission
    When The user navigated to the Create "Stop Cheque" service request screen
    And The user selects 'SCR-IND-SUCCESS' from Select Account Number Dropdown
    And I am selecting "Individual Cheque(s)" as Request Type
    And I am entering inputs into "Cheque Number", "Value", "Issue Date", "Payee Name" & "Note" in Cheque Detail
      | chqNum | chqAmt   | chqIssDt | payeeName     | note         |
      | 123456 | 1,000.00 |          | Testing Payee | Testing Note |
    And The user Clicks the "Review & Submit" button
    Then The application accepts input and move to Stop Individual Cheque submission Review Page
    When The user Clicks the "Previous" button
    Then The application shows previously entered details
    When The user Clicks the "Review & Submit" button
    And The user Clicks the "Submit" button
    Then The application will display the Submit Response Dialog with status "Successful"
  #-----------------------------------------------------------------------------------------------------------------------
  @DIGS-464
  Scenario: Stop Individual Cheque - Multiple - Successful Request
    Given An authorised user with permission
    * For Acceptance Criteria "DIGS-464-03"
    When The user navigated to the Create "Stop Cheque" service request screen
    And The user selects 'SCR-IND-MULTI-SUCCESS' from Select Account Number Dropdown
    And I am selecting "Individual Cheque(s)" as Request Type
    And The user Clicks the "Add" button "Once" in Cheque Details section
    And I am entering inputs into "Cheque Number", "Value", "Issue Date", "Payee Name" & "Note" in Cheque Detail
      | chqNum | chqAmt   | chqIssDt | payeeName      | note          |
      | 123456 | 1,000.00 |          | Testing Payee1 | Testing Note1 |
      | 456789 | 2,000.00 |          | Testing Payee2 | Testing Note2 |
    And The user Clicks the "Review & Submit" button
    Then The application accepts input and move to Stop Individual Cheque submission Review Page
    When The user Clicks the "Previous" button
    Then The application shows previously entered details
    When The user Clicks the "Review & Submit" button
    And The user Clicks the "Submit" button
    Then The application will display the Submit Response Dialog
#-----------------------------------------------------------------------------------------------------------------------
