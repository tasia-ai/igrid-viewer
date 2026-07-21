using Microsoft.EntityFrameworkCore;
using IGrid.Server.Models;

namespace IGrid.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Avatar> Avatars => Set<Avatar>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Username).IsUnique();
            entity.HasIndex(u => u.Email).IsUnique();
        });

        modelBuilder.Entity<Avatar>(entity =>
        {
            entity.HasIndex(a => new { a.FirstName, a.LastName }).IsUnique();

            entity.HasOne(a => a.User)
                  .WithMany(u => u.Avatars)
                  .HasForeignKey(a => a.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
