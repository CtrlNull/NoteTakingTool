using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
        // ========================== { Get All } ========================== //
        public List<Token> GetAll()
        {
            List<Token> results = null;
            dataProvider.ExecuteCmd(
               "third_party_token_getAll",
               inputParamMapper: null,
               singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   if (results == null)
                   {
                       results = new List<Token>();
                   }
                   Token result = new Token();
                   result.id = reader.GetInt32(0);
                   result.service_name = reader.GetString(1);
                   result.token = reader.GetString(2); // check! referenced as long!!!!

                   results.Add(result);
               });
            return results;
        }
        // ========================== { Get By Id } ========================== //
        public Token GetById(int id)
        {
            Token result = null;
            dataProvider.ExecuteCmd(
                "third_party_token_getbyid",
                inputParamMapper: delegate (SqlParameterCollection parameters)
                {
                    parameters.AddWithValue("@id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    result = new Token();
                    result.id = reader.GetInt32(0);
                    result.service_name = reader.GetString(1);
                    result.token = reader.GetString(2);
                }
            );
            return result;
        }
        // ========================== { Create } ========================== //
        public int Create(TokenRequestCreate request)
        {
            int id = 0;
            dataProvider.ExecuteNonQuery(
            "third_party_token_create", inputParamMapper: delegate (SqlParameterCollection parameters)
            {
                parameters.AddWithValue("@service_name", request.ServiceName);
                parameters.AddWithValue("@token", request.Token);

                SqlParameter idParam = parameters.Add("@id", SqlDbType.Int);
                idParam.Direction = ParameterDirection.Output;
            },
            returnParameters: delegate (SqlParameterCollection paramenters)
            {
                id = (int)paramenters["@id"].Value;
            });
            return id;
        }

        // ========================== { Delete } ========================== //
        public void Delete(int id)
        {
            dataProvider.ExecuteNonQuery(
                    "third_party_token_delete",
                    inputParamMapper: delegate (SqlParameterCollection parameters)
                    {
                        parameters.AddWithValue("@id", id);
                    });
        }
        // ========================== { Update } ========================== //
        //public Token Update(int id)
        //{
        //    Token result = null;
        //    dataProvider.ExecuteCmd(
        //        "third_party_token_create",
        //        inputParamMapper: delegate (SqlParameterCollection parameters)
        //        {
        //            parameters.AddWithValue("@id", id);
        //        }
        //        , singleRecordMapper: delegate (IDataReader reader, short set)
        //        {
        //            result = new Token();
        //            result.id = reader.GetInt32(0);
        //            result.service_name = reader.GetString(1);
        //            result.token = reader.GetString(2);
        //        }
        //    );
        //    return result;
        //}
    }
}
