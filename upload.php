<script>spinnerOn</script>
<?php
    $file = $_FILES["inpFile"]["name"];
    $fileName = md5_file($_FILES["inpFile"]["tmp_name"]);
    $fileExtention = pathinfo($file, PATHINFO_EXTENSION);
    $targetPath = "image/".$fileName.'.'.$fileExtention;
    // $targetPath = basename($_FILES["inpFile"]["name"]);
    $lastFile = fopen("image/last.txt", "w");
    fwrite($lastFile, $targetPath);
    fclose($lastFile);
    move_uploaded_file($_FILES["inpFile"]["tmp_name"], $targetPath);
?>
