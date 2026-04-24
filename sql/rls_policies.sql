-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- profiles
-- ============================================================
CREATE POLICY "Public read profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- categories
-- ============================================================
CREATE POLICY "Public read categories"
  ON categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- products
-- ============================================================
CREATE POLICY "Public read active products"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- product_images
-- ============================================================
CREATE POLICY "Public read product images"
  ON product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_images.product_id
      AND products.is_active = true
    )
  );

CREATE POLICY "Admin can manage product images"
  ON product_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- product_variants
-- ============================================================
CREATE POLICY "Public read product variants"
  ON product_variants FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage product variants"
  ON product_variants FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- ingredients
-- ============================================================
CREATE POLICY "Public read ingredients"
  ON ingredients FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage ingredients"
  ON ingredients FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- product_ingredients
-- ============================================================
CREATE POLICY "Public read product ingredients"
  ON product_ingredients FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage product ingredients"
  ON product_ingredients FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- product_extras
-- ============================================================
CREATE POLICY "Public read product extras"
  ON product_extras FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage product extras"
  ON product_extras FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- carts - SOLO el usuario puede ver su propio carrito
-- ============================================================
CREATE POLICY "Users can manage own cart"
  ON carts FOR ALL
  USING (
    auth.uid() = user_id
    OR (session_id IS NOT NULL AND session_id = current_setting('app.session_id', true))
  );

-- ============================================================
-- cart_items - solo ítems del carrito del usuario
-- ============================================================
CREATE POLICY "Users can manage own cart items"
  ON cart_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND (carts.user_id = auth.uid() OR carts.session_id = current_setting('app.session_id', true))
    )
  );

-- ============================================================
-- addresses - solo el usuario puede ver sus direcciones
-- ============================================================
CREATE POLICY "Users can manage own addresses"
  ON addresses FOR ALL
  USING (auth.uid() = user_id);

-- ============================================================
-- coupons - lectura pública, admin gestiona
-- ============================================================
CREATE POLICY "Public read active coupons"
  ON coupons FOR SELECT
  USING (
    is_active = true
    AND (valid_until IS NULL OR valid_until > NOW())
    AND (valid_from IS NULL OR valid_from <= NOW())
    AND (max_uses IS NULL OR used_count < max_uses)
  );

CREATE POLICY "Admin can manage coupons"
  ON coupons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- orders
-- ============================================================
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can update any order"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- order_items
-- ============================================================
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
      ))
    )
  );

CREATE POLICY "Users can create order items"
  ON order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_id
      AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
    )
  );

-- ============================================================
-- reviews
-- ============================================================
CREATE POLICY "Public read reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- banners - lectura pública, admin gestiona
-- ============================================================
CREATE POLICY "Public read active banners"
  ON banners FOR SELECT
  USING (
    is_active = true
    AND (valid_until IS NULL OR valid_until > NOW())
    AND (valid_from IS NULL OR valid_from <= NOW())
  );

CREATE POLICY "Admin can manage banners"
  ON banners FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- ============================================================
-- site_settings
-- ============================================================
CREATE POLICY "Public read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage site settings"
  ON site_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );
