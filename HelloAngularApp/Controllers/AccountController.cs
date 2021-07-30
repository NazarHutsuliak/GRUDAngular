using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AccountsWeb.Models;

namespace AccountsWeb.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class AccountController : Controller
    {
        readonly ApplicationContext db;
        public AccountController(ApplicationContext context)
        {
            db = context;
            if (!db.Accounts.Any())
            {
                db.Accounts.Add(new Account { Name = "Nazar1", Surname = "Hutsuliak1", Balance = 100, Currency ="USD", City ="Lviv", Age =10 });
                db.Accounts.Add(new Account { Name = "Nazar2", Surname = "Hutsuliak2", Balance = 200, Currency = "EUR", City = "Kiev", Age = 20 });
                db.Accounts.Add(new Account { Name = "Nazar3", Surname = "Hutsuliak3", Balance = 300, Currency = "JPU", City = "Rivne", Age = 30 });
                db.SaveChanges();
            }
        }
        [HttpGet]
        public IEnumerable<Account> Get()
        {
            return db.Accounts.ToList();
        }

        [HttpGet("{id}")]
        public Account Get(int id)
        {
            Account product = db.Accounts.FirstOrDefault(x => x.Id == id);
            return product;
        }

        [HttpPost]
        public IActionResult Post(Account product)
        {
            if (ModelState.IsValid)
            {
                db.Accounts.Add(product);
                db.SaveChanges();
                return Ok(product);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Account product)
        {
            if (ModelState.IsValid)
            {
                db.Update(product);
                db.SaveChanges();
                return Ok(product);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Account product = db.Accounts.FirstOrDefault(x => x.Id == id);
            if (product != null)
            {
                db.Accounts.Remove(product);
                db.SaveChanges();
            }
            return Ok(product);
        }
    }
}