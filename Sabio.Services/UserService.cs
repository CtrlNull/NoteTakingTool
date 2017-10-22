using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Services.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService _authenticationService;
        private ICryptographyService _cryptographyService;
        private IDataProvider _dataProvider;
        private const int HASH_ITERATION_COUNT = 1;
        private const int RAND_LENGTH = 15;

        public UserService(IAuthenticationService authSerice, ICryptographyService cryptographyService, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
            _cryptographyService = cryptographyService;
        }
        public bool LogIn(string email, string password)
        {
            bool isSuccessful = false;

            string salt = GetSalt(email);

            if (!String.IsNullOrEmpty(salt))
            {
                string passwordHash = _cryptographyService.Hash(password, salt, HASH_ITERATION_COUNT);

                IUserAuthData response = Get(email, passwordHash);

                if (response != null)
                {
                    _authenticationService.LogIn(response);
                    isSuccessful = true;
                }
            }
            return isSuccessful;
        }
        public bool LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;


            IUserAuthData response = new UserBase {
                Id = id
                , Name = "FakeUser" + id.ToString()
                , Roles = roles ?? new[] { "User", "Super" , "Content Manager"} };

            Claim tenant = new Claim("Tenant", "AAAA");
            Claim fullName = new Claim("FullName", "Sabio Bootcamp");

            //Login Supports multiple claims
            //and multiple roles a good an quick example to set up for 1 to many relationship
            _authenticationService.LogIn(response, new Claim[] { tenant, fullName });

            return isSuccessful;
        }
        public int Create(object userModel)
        {
            int userId = 0;
            string salt;
            string passwordHash;

            string password = "Get from user model when you have a concreate class";

            salt = _cryptographyService.GenerateRandomString(RAND_LENGTH);
            passwordHash = _cryptographyService.Hash(password, salt, HASH_ITERATION_COUNT);

            //DB provider call to create user and get us a user id

            //be sure to store both salt and passwordHash
            //DO NOT STORE the original password value that the user passed us


            return userId;
        }
        /// <summary>
        /// Gets the Data call to get a give user
        /// </summary>
        /// <param name="email"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        private IUserAuthData Get(string email, string passwordHash)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// The Dataprovider call to get the Salt for User with the given UserName/Email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private string GetSalt(string email)
        {
            //DataProvider Call to get Salt
            throw new NotImplementedException();
        }
    }
}
