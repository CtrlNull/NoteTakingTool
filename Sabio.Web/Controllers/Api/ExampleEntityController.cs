using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Content
{
    [RoutePrefix("api/example-entity")]
    [AllowAnonymous]
    public class ExampleEntityController : ApiController
    {
        readonly IExampleEntityService exampleEntityService;

        public ExampleEntityController(IExampleEntityService exampleEntityService)
        {
            this.exampleEntityService = exampleEntityService;
        }

        [Route, HttpGet]
        public List<ExampleEntity> GetAll()
        {
            return exampleEntityService.GetAll();
        }
    }
}