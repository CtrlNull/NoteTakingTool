using Sabio.Models.Domain;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IExampleEntityService
    {
        List<ExampleEntity> GetAll();
    }
}
