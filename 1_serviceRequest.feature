@ui-mock @api-mock @service-request
Feature: Service Request
  User should able to initiate new Service Rquest
  #-----------------------------------------------------------------------------------------------------------------------
  @smoke-testing
  Scenario: Request Types options
    Given An authorised user with permission
    When The user navigated to the service request screen
    Then The application shows Service Request Types
    When The user Clicks the "Stop Cheque Request" button from Service Type
    Then The application must display the "Stop Cheque Request" screen
    When The user Clicks the "Cancel" button
    Then The application shows Service Request Types
    When The user Clicks the "Order Deposit Book" button from Service Type
    Then The application must display the "Order Deposit Book" screen
    When The user Clicks the "Cancel" button
    Then The application shows Service Request Types
    When The user Clicks the "Order Cheque Book" button from Service Type
    Then The application must display the "Order Cheque Book" screen
    When The user Clicks the "Cancel" button
    Then The application shows Service Request Types
    When The user Clicks the "Cancel" button
    Then The application must display the service request list screen
#-----------------------------------------------------------------------------------------------------------------------