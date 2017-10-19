using Sabio.Data.Providers;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class token_service : ITokenService
    {
        // create a readonly field to hold the injected thing
        readonly IDataProvider dataProvider;
        // create contructor and ask for that thing(s) as a parameter
        public token_service(IDataProvider dataProvider)
        {
            // store the paramenter in the field
            this.dataProvider = dataProvider;
        }
        public int Create(token_create_request)
        {
            int id = 0;
            dataProvider.ExecuteNonQuery(
            "token_create", inputParamMapper: delegate (SqlParameterCollection parametes)
            {
                paramenters.AddWithValue("@id", request.id);
                parameters.AddwithValue("@service_name", request.service_name);

                SqlParameter idParam = parameters.Add("@id").Value;
            });
        }


    }
}
