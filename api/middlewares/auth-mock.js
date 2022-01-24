module.exports = {
  authMock,
}

/**
 * @type {import('express').RequestHandler}
 */
function authMock(request, response, next) {
  request.session.prm_user = {
    id: 4,
    created_at: '2014-08-12T06:46:12.346Z',
    updated_at: '2020-06-02T03:02:29.227Z',
    password_digest:
      '41606f19cf2550de88c990cbe551029359308de1071ac7609aef6ca1ff272e58',
    salt: 'asQh7SlCz20HJDublz6U01h7eYc=',
    permissions: [
      { resource_name: 'Home', scope_name: 'All' },
      { resource_name: 'Call Center Dashboard', scope_name: 'All' },
      { resource_name: 'Calendar', scope_name: 'All' },
      { resource_name: 'Patients', scope_name: 'All' },
      { resource_name: 'Documents', scope_name: 'All' },
      { resource_name: 'Offers', scope_name: 'All' },
      { resource_name: 'Invoices', scope_name: 'All' },
      { resource_name: 'Advance Payments', scope_name: 'All' },
      { resource_name: 'Assignments', scope_name: 'All' },
      { resource_name: 'Statistics', scope_name: 'All' },
      { resource_name: 'Statistics For Clinic', scope_name: 'All' },
      { resource_name: 'Personal Statistics', scope_name: 'All' },
      { resource_name: 'Reporting', scope_name: 'All' },
      { resource_name: 'Emazing', scope_name: 'All' },
      { resource_name: 'Doctor', scope_name: 'All' },
      { resource_name: 'Tax Authority', scope_name: 'All' },
      { resource_name: 'Call Center', scope_name: 'All' },
      { resource_name: 'Leads', scope_name: 'All' },
      { resource_name: 'Client Info', scope_name: 'All' },
      { resource_name: 'KPIs', scope_name: 'All' },
      { resource_name: 'Work Report', scope_name: 'All' },
      { resource_name: 'Activity Report', scope_name: 'All' },
      { resource_name: 'Missing Services', scope_name: 'All' },
      { resource_name: 'Settings', scope_name: 'All' },
      { resource_name: 'Free Slots', scope_name: 'All' },
      { resource_name: 'Users', scope_name: 'All' },
      { resource_name: 'Locations', scope_name: 'All' },
      { resource_name: 'Services and Products', scope_name: 'All' },
      { resource_name: 'Business Customers', scope_name: 'All' },
      { resource_name: 'Invoicing', scope_name: 'All' },
      { resource_name: 'SMS Templates', scope_name: 'All' },
      { resource_name: 'Mail Templates', scope_name: 'All' },
      { resource_name: 'Advertising', scope_name: 'All' },
      { resource_name: 'Labels', scope_name: 'All' },
      { resource_name: 'Online Booking', scope_name: 'All' },
      { resource_name: 'Appointments', scope_name: 'All' },
    ],
    email: 'info@emazing.si',
    encrypted_password:
      '$2a$10$oaqZiFdYFt78b/OcspLMAOMelH3UECN24JTjsHFSymizsoY3DnIZ6',
    remember_created_at: '2020-06-01T00:12:50.635Z',
    sign_in_count: 656,
    current_sign_in_at: '2020-06-02T03:02:29.226Z',
    last_sign_in_at: '2022-01-21T09:25:47.369Z',
    current_sign_in_ip: '81.232.117.250',
    last_sign_in_ip: '81.232.117.250',
    name: 'Emazing',
    accessible_user_ids: [
      '25',
      '50',
      '41',
      '2',
      '17',
      '36',
      '37',
      '44',
      '33',
      '53',
      '51',
      '46',
      '34',
      '13',
      '27',
      '42',
      '28',
      '29',
      '63',
      '15',
      '62',
      '61',
      '64',
      '8',
      '60',
      '18',
      '30',
      '43',
      '48',
      '49',
      '26',
      '14',
      '10',
      '22',
      '32',
      '16',
      '5',
      '9',
      '57',
      '6',
      '66',
      '12',
      '67',
      '39',
      '40',
      '65',
      '3',
      '19',
      '56',
      '7',
      '21',
      '1',
      '20',
      '4',
      '31',
      '59',
      '23',
      '24',
      '38',
      '35',
      '47',
      '52',
    ],
    phone_number: '',
    locale: 'en',
    roles: ['superadmin'],
    active: true,
    facebook_app_admin: false,
    prm_role_id: 11,
    prm_password_hash:
      '$2b$12$zHk/lqjgGOaYmzWU9Gtw1usL7oSFp7up91PvgmNdp/dzJ7mWS8wha',
    prm_company_id: 4,
    tax_number: null,
    prm_client_id: 1,
    title: '',
    specialization: '',
    prm_locale: 'en',
    function: null,
    first_name: 'Emazing',
    surname: 'General',
    position: '',
  }

  next()
}