<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    json_response(405, [
        'success' => false,
        'error' => 'Method not allowed. Use GET.',
    ]);
}

$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 200;
$limit = max(1, min($limit, 500));

$connection = db();
$result = $connection->query(
    "SELECT id, name, category, price, description, image_path, stock
     FROM products
     ORDER BY id ASC
     LIMIT {$limit}"
);

if (!$result) {
    json_response(500, [
        'success' => false,
        'error' => 'Unable to fetch products.',
        'details' => $connection->error,
    ]);
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

json_response(200, [
    'success' => true,
    'count' => count($rows),
    'data' => $rows,
]);
