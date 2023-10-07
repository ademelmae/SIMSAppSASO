using System;
using System.Linq;
using SIMSApp.Models; // Make sure this namespace matches your project's namespace
using Microsoft.EntityFrameworkCore;

namespace SIMSApp.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly simsdbContext _dbContext; // Replace YourDbContext with your actual DbContext

        public UserRepository(simsdbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Useraccount AuthenticateUser(string username, string password)
        {
            // Implement user authentication logic here.
            // For demonstration purposes, let's assume you have a Users DbSet in your DbContext.

            var user = _dbContext.Useraccounts
                .FirstOrDefault(u => u.Username == username && u.Password == password);

            return user;
        }

        public Task<Useraccount> AuthenticateUserAsync(string username, string password)
        {
            throw new NotImplementedException();
        }

        // You can add more methods here for working with users in the database.
    }
}
