using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IExampleEntityService
    {
        List<ExampleEntity> GetAll();
        int Create(ExampleEntityCreateRequest request);
        ExampleEntity GetById(int id);
    }
}
