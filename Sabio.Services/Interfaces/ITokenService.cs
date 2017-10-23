using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface  ITokenService
    {
        // methods supported
        List<Token> GetAll();
        Token GetById(int id);

        int Create(TokenRequestCreate request);



        Token Delete(int id);
        Token Update(int id);

    }
}
