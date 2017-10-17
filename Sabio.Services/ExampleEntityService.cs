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
    public class ExampleEntityService : IExampleEntityService
    {
        // 1. create a readonly field to hold the injected thing
        readonly IDataProvider dataProvider;

        // 2. create a contructor and ask for that thing(s) as parameter

        public ExampleEntityService(IDataProvider dataProvider)
        {
            // 3. store the parameter in the field
            this.dataProvider = dataProvider;
        }

        public int Create(ExampleEntityCreateRequest request)
        {
            int id = 0;

            /*
            
            // This is the plain-vanilla ADO.NET version of the dataProvider call below

            using (SqlConnection con = new SqlConnection("..."))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "example_entity__create"; // #1

                cmd.Parameters.AddWithValue("@stuff", request.Stuff); // #2
                cmd.Parameters.AddWithValue("@thing", request.Thing);
                SqlParameter idParam = cmd.Parameters.Add("@id", SqlDbType.Int);
                idParam.Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                id = (int)cmd.Parameters["@id"].Value; // #3
            }

            return id;
            */

            dataProvider.ExecuteNonQuery(
                "example_entity__create", // #1
                inputParamMapper: delegate (SqlParameterCollection parameters)
                {
                    /*
                    Here's the long version of:
                    parameters.AddWithValue("@stuff", request.Stuff);

                    SqlParameter stuffParam;
                    stuffParam = new SqlParameter();
                    stuffParam.ParameterName = "@stuff";
                    stuffParam.Value = request.Stuff;
                    stuffParam.Direction = ParameterDirection.Input;
                    parameters.Add(stuffParam);
                    */

                    parameters.AddWithValue("@stuff", request.Stuff); // #2
                    parameters.AddWithValue("@thing", request.Thing);

                    SqlParameter idParam = parameters.Add("@id", SqlDbType.Int);
                    idParam.Direction = ParameterDirection.Output;
                },
                returnParameters: delegate (SqlParameterCollection parameters)
                {
                    id = (int)parameters["@id"].Value; // #3

                    // do NOT do this:
                    // int.TryParse(parameters["@id"].Value.ToString(), out id);
                });

            return id;
        }

        public List<ExampleEntity> GetAll()
        {
            List<ExampleEntity> results = null;

            dataProvider.ExecuteCmd(
                "example_entity__getall",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    if (results == null)
                    {
                        results = new List<ExampleEntity>();
                    }

                    // In English this means:
                    // create a new variable called result that can hold an object of type
                    // ExampleEntity. THEN, create a new instance of ExampleEntity and
                    // store it in that variable.
                    ExampleEntity result = new ExampleEntity();

                    result.Id = reader.GetInt32(0);
                    result.DateCreated = reader.GetDateTime(1);
                    result.DateModified = reader.GetDateTime(2);
                    result.Thing = reader.GetInt32(3);
                    result.Stuff = reader.GetString(4);

                    results.Add(result);
                });

            return results;
        }
    }
}
