# This sets up the mock for the AWS module via the ExAws.Behaviour
Mox.defmock(ExAwsMock, for: ExAws.Behaviour)

# This sets up the mock for the SearchIndexConfig module via the Admin.Publications.SearchIndexConfig.Behaviour
Mox.defmock(SearchIndexConfigMock, for: Admin.Publications.SearchIndexConfig.Behaviour)
