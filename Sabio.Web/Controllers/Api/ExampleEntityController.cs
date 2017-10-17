using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
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
        public ItemsResponse<ExampleEntity> GetAll()
        {
            ItemsResponse<ExampleEntity> itemsResponse = new ItemsResponse<ExampleEntity>();
            itemsResponse.Items = exampleEntityService.GetAll();
            return itemsResponse;
        }

        [Route, HttpPost]
        public ItemResponse<int> Create(ExampleEntityCreateRequest req)
        {
            ItemResponse<int> itemResponse = new ItemResponse<int>();
            itemResponse.Item = exampleEntityService.Create(req);
            return itemResponse;
        }
    }
}