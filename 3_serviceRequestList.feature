@service-requests-list
Feature: Service Request List
  User should able to see all Rquests
  #-----------------------------------------------------------------------------------------------------------------------
  @ui-mock @api-mock @smoke-testing
  Scenario: Service Request List
    Given An authorised user with permission
    When The user navigated to the "Cash Management Service Requests" screen
    Then The application must display the service request list screen
    When The user navigated to the "Cash Management Service Requests" screen
    And The user Clicks the "New" button
    Then The application shows Service Request Types
    When The user Clicks the "Cancel" button
    Then The application must display the service request list screen
  #-----------------------------------------------------------------------------------------------------------------------
  @ui-mock @api-mock
  Scenario: Service Request List - Grid Actions
    Given An authorised user with permission
    When The user navigated to the "Cash Management Service Requests" screen
    And I Click one of the column to sort Grid Data
    Then The application shows sorting indicator and sort Grid Data
    When I Right Click on Column Header and uncheck a column
    Then The application hide the column in Grid
    When I Right Click on Column Header and Click "Fit to Columns to Window"
    Then The application resize the Colums, I able to see all columns without Horizontal Scroll
    When I Right Click on Column Header and Click "Reset Grid Columns"
    Then The application resize the Colums, I ablet to see columns and may see Horizontal Scroll
  #-----------------------------------------------------------------------------------------------------------------------
  @ui-mock @api-mock @DIGS-359
  Scenario: Grid advanced search / Filter
    Given An authorised user with permission
    When The user navigated to the "Cash Management Service Requests" screen
    And The user click View menu to view all Filters
    Then The application must default the fields as per the field matrix and default the search option
    When The user Click 'All' Filter
    Then The application fetch the Service Request List based on Filter Params
    When The user Click 'My Requests' Filter
    Then The application fetch the Service Request List based on Filter Params
    When The user Click 'Successful' Filter
    Then The application fetch the Service Request List based on Filter Params
    When The user Click 'Unsuccessful' Filter
    Then The application fetch the Service Request List based on Filter Params
    When The user Select One of the Request Status from Advance Search and hit search
    Then The application fetch the Service Request List based on selected Filter Params
    And The user selects Advanced 'Search'
    Then The application must present the 'Advanced Search Panel' with search options as per the field matrix
    When The user enters few search criteria
    And The user hit Search
    Then The application keeps the search criteria
    When The user selects to 'Reset' the advanced search criteria
    Then The application must clear all search criteria entered eariler and set search criteria to default values
    When The user enters few search criteria
    And Then user Clicking 'Save' with few search criteria and SearchName as "Testing"
    Then The application Saved search must be available in Folder list under 'Select A Search' option
    When The user Clicking 'Manage Saved Search' from View
    Then The application must show 'Manage Saved Search' Dialog to Manage user Saved Search and show option to rename or delete existing user defined searches
    When I navigate to Advanced Search panel in Service Request List screen and select few criteria and click 'Search' button
    Then The application must display filtered SRs (based on search criteria selected) in List screen grid
    When I am entering Request ID as "ABCD" as Search Paramaters
    Then The application show no rows in the grid. Instead, standard message must be displayed
  #-----------------------------------------------------------------------------------------------------------------------
  @ui-mock
  Scenario: Grid API Vaidation Error
    When I am entering some Search Parameters
    And The application may not available to serve the request
    Then The application shows error message in toast for "API validation failed"
  #-----------------------------------------------------------------------------------------------------------------------
  @ui-mock @api-mock @DIGS-365
  Scenario: Service Request List - Grid Filter Action
    Given An authorised user with permission
    * For Acceptance Criteria "DIGS-365-01"
    When The user navigated to the "Cash Management Service Requests" screen
    Then The application shows the "Filter" button

    * For Acceptance Criteria "DIGS-365-02"
    When The user Clicks the "Filter" button
    Then The application show quick search input box for each of the grid columns

    * For Acceptance Criteria "DIGS-365-03"
    When The User key in few characters in quick search input box of one of the grid columns
    Then The grid must be filtered to display only those rows which have matching values in the searched column

    * For Acceptance Criteria "DIGS-365-04"
    When The User key in few characters in quick search input box of any two of the grid columns
    Then The grid must be filtered to display only those rows which have matching values in the searched column

    * For Acceptance Criteria "DIGS-365-06"
    When The User key in few not matching characters in quick search input box of one of the grid columns
    Then The grid must not display any rows in the grid
  #-----------------------------------------------------------------------------------------------------------------------
  @ui-mock @api-mock @DIGS-363
  Scenario: Service Request List - Grid Export Action
    Given An authorised user with permission
    * For Acceptance Criteria "DIGS-363-01"
    When The user navigated to the "Cash Management Service Requests" screen
    Then The application shows the "Export" button

    * For Acceptance Criteria "DIGS-363-02"
    When The user Clicks the "Export" button
    Then The application shows Export button as selected
  # @DIGS-363-03 - can't be tested, since response not catchable
  #-----------------------------------------------------------------------------------------------------------------------
  @ui-mock @api-mock, @DIGS-364
  Scenario: Service Request List - Grid Refresh Action
    Given An authorised user with permission
    * For Acceptance Criteria "DIGS-364-01"
    When The user navigated to the "Cash Management Service Requests" screen
    Then The application shows the "Refresh" button

    * For Acceptance Criteria "DIGS-364-02"
    When The user Clicks the "Refresh" button
    Then The application shows latest data in the grid
  # @DIGS-364-03 @DIGS-364-04 - can't be tested, since there is no way to simulate in ST
  #-------------------------------------------------------------------------------------------------------------------------
  @ui-mock @api-mock @DIGS-360
  Scenario: Service Request List - Grid Group Action
    Given An authorised user with permission
    * For Acceptance Criteria "DIGS-360-01"
    When The user navigated to the "Cash Management Service Requests" screen
    Then The application shows the "Group" button

    * For Acceptance Criteria "DIGS-360-02"
    When The user Clicks the "Group" button
    Then The application shows all Grouping options

    * For Acceptance Criteria "DIGS-360-03"
    When The user select a "Off" group option
    Then The application shows service requests grouped based on "Off"
    When The user select a "Account Name" group option
    Then The application shows service requests grouped based on "Account Name"
    When The user select a "Account Number" group option
    Then The application shows service requests grouped based on "Account Number"
    When The user select a "Created By" group option
    Then The application shows service requests grouped based on "Created By"

    * For Acceptance Criteria "DIGS-360-04"
    When The user select a "Collapse All" group option
    Then The application shows service request rows as "collapsed" under each grouping option value

    * For Acceptance Criteria "DIGS-360-05"
    When The user select a "Expand All" group option
    Then The application shows service request rows as "expanded" under each grouping option value

    * For Acceptance Criteria "DIGS-360-06"
    When The user select a "Collapse By Default" group option
    Then The application shows service request rows as "collapsed" under each grouping option value
  #-------------------------------------------------------------------------------------------------------------------------
  @ui-mock @api-mock @DIGS-367
  Scenario: Service Request List - Save Settings
    Given An authorised user with permission
    When The user navigated to the "Cash Management Service Requests" screen
    Then The application must show the Settings button
    When The user click View menu to view all Filters
    Then The application must default the fields as per the field matrix and default the search option
    When The user Click 'All' Filter
    Then The application fetch the Service Request List based on Filter Params
    And The user Click 'My Requests' Filter
    Then The application fetch the Service Request List based on Filter Params
    When The user Clicks the "Group" button
    Then The application shows all Grouping options
    When The user select a "Request Type" group option
    Then The application shows service requests grouped based on "Request Type"
    And I Click one of the column to sort Grid Data
    Then The application shows sorting indicator and sort Grid Data
    When The user saves the filter settings
    Then The Grid with the filtered results must be saved
    When The user navigated to the service request screen
    Then The application shows Service Request Types
    When The user Clicks the "Cancel" button
    Then The application must navigate to the "View Service Request List" screen
    And The Grid must display the results as per the last saved settings
    When The user click View menu to view all Filters
    Then The application must default the fields as per the field matrix and default the search option
    When The user Click 'All' Filter
    Then The application fetch the Service Request List based on Filter Params
    When The user Clicks the "Group" button
    Then The application shows all Grouping options
    When The user select a "Off" group option
    Then The application shows service requests grouped based on "Off"
    When The user saves the filter settings
    Then The Grid with the filtered results must be saved
# API call error can't be tested since there is no way to simulate in ST