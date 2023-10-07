using SIMSApp.Models; // Make sure this namespace is correct

namespace SIMSApp.Repositories
{
    public interface IUserRepository 
    {
        Useraccount AuthenticateUser(string username, string password);
        Task<Useraccount> AuthenticateUserAsync(string username, string password);
    }
}