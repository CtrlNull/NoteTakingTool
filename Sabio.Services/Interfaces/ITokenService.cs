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
        //List<Token> Delete();
        //List<Token> Create();
        //List<Token> Update();
        int Create(TokenRequest request);
    }
}
