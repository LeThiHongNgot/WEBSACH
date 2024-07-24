using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace QLCHS.Entities
{
    public partial class QLBANSACHContext : DbContext
    {
        public QLBANSACHContext()
        {
        }

        public QLBANSACHContext(DbContextOptions<QLBANSACHContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Author> Authors { get; set; } = null!;
        public virtual DbSet<Banner> Banners { get; set; } = null!;
        public virtual DbSet<Bill> Bills { get; set; } = null!;
        public virtual DbSet<Book> Books { get; set; } = null!;
        public virtual DbSet<Bookdetail> Bookdetails { get; set; } = null!;
        public virtual DbSet<Bookimg> Bookimgs { get; set; } = null!;
        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Otp> Otps { get; set; } = null!;
        public virtual DbSet<ProductReview> ProductReviews { get; set; } = null!;
        public virtual DbSet<Supplier> Suppliers { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Voucher> Vouchers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=LETHIHONGNGOT\\MSSQLSERVER04;Initial Catalog=QLBANSACH;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>(entity =>
            {
                entity.ToTable("AUTHORS");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Banner>(entity =>
            {
                entity.ToTable("BANNERS");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.Image).HasColumnType("text");

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Bill>(entity =>
            {
                entity.ToTable("BILLS");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.BillDate).HasColumnType("datetime");

                entity.Property(e => e.PaymentStatus).HasMaxLength(50);

                entity.Property(e => e.Status).HasMaxLength(256);

                entity.Property(e => e.TotalAmount).HasColumnType("money");

                entity.Property(e => e.UserId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.VoucherId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_BILLS_USERS");

                entity.HasOne(d => d.Voucher)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.VoucherId)
                    .HasConstraintName("FK_BILLS_VOUCHERS");
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.ToTable("BOOKS");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AuthorId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PricePercent).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.SupplierId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Title).HasMaxLength(100);

                entity.Property(e => e.UnitPrice).HasColumnType("money");

                entity.HasOne(d => d.Author)
                    .WithMany(p => p.Books)
                    .HasForeignKey(d => d.AuthorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BOOKS_AUTHORS");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.Books)
                    .HasForeignKey(d => d.SupplierId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BOOKS_SUPPLIERS");
            });

            modelBuilder.Entity<Bookdetail>(entity =>
            {
                entity.HasKey(e => e.BookId)
                    .HasName("PK__BOOKDETA__3DE0C207252AF59E");

                entity.ToTable("BOOKDETAILS");

                entity.Property(e => e.BookId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.Dimensions)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.Book)
                    .WithOne(p => p.Bookdetail)
                    .HasForeignKey<Bookdetail>(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BOOKDETAILS_BOOKS");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Bookdetails)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BOOKDETAILS_CATEGORIES");
            });

            modelBuilder.Entity<Bookimg>(entity =>
            {
                entity.HasKey(e => e.BookId)
                    .HasName("PK__BOOKIMG__3DE0C2077BE38430");

                entity.ToTable("BOOKIMG");

                entity.Property(e => e.BookId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Book)
                    .WithOne(p => p.Bookimg)
                    .HasForeignKey<Bookimg>(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BOOKIMG_BOOKS");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("CARTS");

                entity.Property(e => e.Id)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BookId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CARTS_BOOKS");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CARTS_CUSTOMER");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("CATEGORIES");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("CUSTOMERS");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Address)
                    .HasMaxLength(256)
                    .HasColumnName("address");

                entity.Property(e => e.Birthday)
                    .HasColumnType("date")
                    .HasColumnName("birthday");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FullName).HasMaxLength(50);

                entity.Property(e => e.Gender)
                    .HasMaxLength(5)
                    .HasColumnName("gender");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("ORDERS");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Address).HasMaxLength(100);

                entity.Property(e => e.BillId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.BookId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.UnitPrice).HasColumnType("money");

                entity.HasOne(d => d.Bill)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.BillId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BILLS_ORDERS");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ORDER_BOOKS");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ORDERS_CUSTOMERS");
            });

            modelBuilder.Entity<Otp>(entity =>
            {
                entity.HasKey(e => e.Email)
                    .HasName("PK__OTPs__A9D10535167CAD95");

                entity.ToTable("OTPs");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ExpiresAt).HasColumnType("datetime");

                entity.Property(e => e.Otpcode)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("OTPCode");
            });

            modelBuilder.Entity<ProductReview>(entity =>
            {
                entity.ToTable("PRODUCT_REVIEWS");

                entity.HasIndex(e => new { e.CustomerId, e.BookId }, "UQ_CUSTOMER_BOOK_REVIEW")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BookId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NgayCommemt).HasColumnType("date");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.ProductReviews)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_REVIEWS_BOOKS");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.ProductReviews)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_REVIEWS_CUSTOMERS");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.ToTable("SUPPLIERS");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Phone)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("USERS");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FullName).HasMaxLength(30);

                entity.Property(e => e.Password)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Role).HasMaxLength(256);
            });

            modelBuilder.Entity<Voucher>(entity =>
            {
                entity.ToTable("VOUCHERS");

                entity.Property(e => e.Id)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DateBegin).HasColumnType("date");

                entity.Property(e => e.DateEnd).HasColumnType("date");

                entity.Property(e => e.MaxDiscount).HasColumnType("money");

                entity.Property(e => e.PercentDiscount).HasColumnType("decimal(5, 2)");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
