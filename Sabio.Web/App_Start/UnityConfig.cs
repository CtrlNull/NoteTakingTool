using Microsoft.Practices.Unity;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Services;
using Sabio.Services.Cryptography;
using Sabio.Web.Core.Services;
using System.Configuration;
using System.Security.Principal;
using System.Threading;
using System.Web.Http;
using System.Web.Mvc;
using Unity.WebApi;

namespace Sabio.Web
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            

            //this should be per request
            container.RegisterType<IAuthenticationService, OwinAuthenticationService>();

            container.RegisterType<ICryptographyService, Base64StringCryptographyService>(new ContainerControlledLifetimeManager());


            container.RegisterType<IDataProvider, SqlDataProvider>(
                new InjectionConstructor(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString));

            container.RegisterType<IPrincipal>(new PerThreadLifetimeManager(),
                     new InjectionFactory(con => Thread.CurrentPrincipal));


            container.RegisterType<IUserService, UserService>(new ContainerControlledLifetimeManager());
     
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));


        }
    }
}