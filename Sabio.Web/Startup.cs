using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartupAttribute(typeof(Sabio.Web.Startup))]
namespace Sabio.Web
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            OAuthOptions = new OAuthAuthorizationServerOptions()
            {
                TokenEndpointPath = new PathString("/token"),
                Provider = new OAuthAuthorizationServerProvider()
                {
                    OnValidateClientAuthentication = async (context) =>
                    {
                        context.Validated();
                    },
                    OnGrantResourceOwnerCredentials = async (context) =>
                    {
                        if (context.UserName == "test.test@mail.com" && context.Password == "test123")
                        {
                            ClaimsIdentity oAuthIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
                            context.Validated(oAuthIdentity);
                        }
                    }
                },
                AllowInsecureHttp = true,
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1)
            };
            app.UseOAuthBearerTokens(OAuthOptions);

            // vv vanilla
            ConfigureAuth(app);
            // ^^ vanilla
        }
    }
}