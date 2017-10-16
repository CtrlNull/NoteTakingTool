using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
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
