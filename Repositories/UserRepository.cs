using System;
using System.Linq;
using SIMSApp.Models;
using Microsoft.EntityFrameworkCore;

namespace SIMSApp.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly simsdbContext _dbContext; 

        public UserRepository(simsdbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Useraccount AuthenticateUser(string username, string password)
        {
        
            var user = _dbContext.Useraccounts
                .FirstOrDefault(u => u.Username == username && u.Password == password);

            return user;
        }

        public Task<Useraccount> AuthenticateUserAsync(string username, string password)
        {
            throw new NotImplementedException();
        }

    }
}
