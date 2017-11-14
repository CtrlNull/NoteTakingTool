using System;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/guid")]
    [AllowAnonymous]
    public class GuidController : ApiController
    {
        [HttpGet]
        public Guid GetNewGuid()
        {
            return Guid.NewGuid();
        }
    }
}