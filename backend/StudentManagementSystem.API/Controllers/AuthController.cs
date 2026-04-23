using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.API.Auth;

namespace StudentManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;

        public AuthController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        public class LoginDto
        {
            public required string Username { get; set; }
            public required string Password { get; set; }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            if (dto.Username == "admin" && dto.Password == "admin123")
            {
                var token = _jwtService.GenerateToken(dto.Username);
                return Ok(new { token });
            }
            return Unauthorized(new { message = "Invalid credentials" });
        }
    }
}
