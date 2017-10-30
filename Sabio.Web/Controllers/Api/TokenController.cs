using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/token")]
    [AllowAnonymous]
    public class TokenController : ApiController
    {
        readonly ITokenService tokenService;
        public TokenController(ITokenService tokenService)
        {
            this.tokenService = tokenService;
        }
        // =================== <Get All> ===================== //
        [Route, HttpGet]
        public ItemsResponse<Token> GetAll()
        {
            ItemsResponse<Token> itemsResponse = new ItemsResponse<Token>();
            itemsResponse.Items = tokenService.GetAll();
            return itemsResponse;
        }
        // =================== <Get By Id> ==================== //
        [Route("{id:int}"), HttpGet]
        public Token GetById(int id)
        {
            return tokenService.GetById(id);
        }
        // =================== <Create> ====================== //
        [Route, HttpPost]
        public HttpResponseMessage Create(TokenRequestCreate req)
        {
            if (req == null)
            {
                ModelState.AddModelError("", "Missing body data.");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            // Declare a variable of type "ItemResponse of int "named itemResponse,
            // then, create a new ItemResponse of int and put it inot that variable
            ItemResponse<int> itemResponse = new ItemResponse<int>();
            itemResponse.Item = tokenService.Create(req);

            return Request.CreateResponse(HttpStatusCode.Created, itemResponse);
        }
        // =================== < Delete > ==================== //
        [Route("{id:int}"), HttpDelete]
        public SuccessResponse Delete(int id)
        {
            tokenService.Delete(id);
            return new SuccessResponse();

        }
        // =================== < Update > ==================== //
        [Route, HttpPut]
        public SuccessResponse Update(TokenUpdateRequest req)
        {
            tokenService.Update(req);
            return new SuccessResponse();
        }
    }
}