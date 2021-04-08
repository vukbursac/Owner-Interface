using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Practices.Unity;
using Newtonsoft.Json.Serialization;
using OwnerInterface.Interfaces;
using OwnerInterface.Models;
using OwnerInterface.Repository;
using OwnerInterface.Resolver;

namespace OwnerInterface
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.EnableSystemDiagnosticsTracing();

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<User, UserDTO>();
                

                  //.ForMember(dest => dest.KorisnikImeIPrezime, opt => opt.MapFrom(src => src.Korisnik.ImeIPrezime));

                //  cfg.CreateMap<Lanac, LanacDTO>();

            });

            // Unity
            var container = new UnityContainer();
            container.RegisterType<IUserRepository, UserRepository>(new HierarchicalLifetimeManager());
            
            config.DependencyResolver = new UnityResolver(container);
        }
    }
}
