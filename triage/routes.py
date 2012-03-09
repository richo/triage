def routes(config):
    # Index
    config.add_route('index', '/')
    # Errors
    config.add_route('error_list', '/projects/{project}')
    config.add_route('error_view', '/projects/{project}/error/{id}')
    config.add_route('error_toggle_claim', '/projects/{project}/error/{id}/toggle/claim')
    config.add_route('error_toggle_resolve', '/projects/{project}/error/{id}/toggle/resolve')
    config.add_route('error_tag_add', '/projects/{project}/error/{id}/tag/add/{tag}')
    config.add_route('error_tag_remove', '/projects/{project}/error/{id}/tag/remove/{tag}')
    config.add_route('error_comment_add', '/projects/{project}/error/{id}/comment/add')
    config.add_route('error_toggle_hide', '/projects/{project}/error/{id}/togglehide')
    # REST API
    config.add_route('api_log', 'api/log')
    # Auth
    config.add_route('user_login', 'user/login')
    config.add_route('user_register', 'user/register')
    config.add_route('user_logout', 'user/logout')
