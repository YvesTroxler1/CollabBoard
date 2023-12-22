        function toggleSidebar() {
            var sidenav = document.getElementById("mySidenav");
            sidenav.style.width = sidenav.style.width === "250px" ? "0" : "250px";
        }
  
        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        }