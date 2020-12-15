using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Smartschool_WebAPI.Data;
using Smartschool_WebAPI.Models;

namespace Smartschool_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly IRepository repo;
        public ProfessorController(IRepository repo) 
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await this.repo.GetAllProfessoresAsync(true);
                return Ok(result);
            }
            catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: ProfessorController");
            }
        }

        [HttpGet("{ProfessorId}")]
        public async Task<IActionResult> GetByProfessorId(int ProfessorId)
        {
            try
            {
                var result = await this.repo.GetProfessorAsyncById(ProfessorId, true);
                return Ok(result);
            }
            catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: ProfessorController");
            }
        }

        [HttpGet("ByAluno/{AlunoId}")]
        public async Task<IActionResult> GetByAlunoId(int AlunoId)
        {
            try
            {
                var result = await this.repo.GetProfessoresAsyncByAlunoId(AlunoId, false);
                return Ok(result);
            }
            catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: ProfessorController");
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(Professor model)
        {
            try
            {
               this.repo.Add(model);
               if( await this.repo.SaveChangesAsync()) 
               {
                    return Ok(model);
               }
            }
            catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: ProfessorController");
            }
            return BadRequest("Erro não esperado !!");
        }

        [HttpPut("{ProfessorId}")]
        public async Task<IActionResult> put(int ProfessorId, Professor model)
        {
            try
            {
               var result = await this.repo.GetProfessorAsyncById(ProfessorId, false);
               if(result == null) NotFound();

               this.repo.Update(model);

               if( await this.repo.SaveChangesAsync()) 
               {
                    return Ok(model);
               }
            }
            catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: ProfessorController");
            }
            return BadRequest("Erro não esperado !!");
        }

        [HttpDelete("{ProfessorId}")]
        public async Task<IActionResult> delete(int ProfessorId)
        {
            try
            {
               var professor = await this.repo.GetProfessorAsyncById(ProfessorId, false);
               if(professor == null) NotFound();

               this.repo.Delete(professor);

               if( await this.repo.SaveChangesAsync()) 
               {
                    return Ok(new { message = "Deletado" });
               }
            }
            catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: ProfessorController");
            }
            return BadRequest("Erro não esperado !!");
        }
    }
}

/*
get all http://localhost:5000/api/professor
get id http://localhost:5000/api/professor/3
get por disciplina http://localhost:5000/api/professor/ByAluno/3
post http://localhost:5000/api/professor
put http://localhost:5000/api/professor/3
delete http://localhost:5000/api/professor/3
*/