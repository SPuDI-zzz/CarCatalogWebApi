# CarCatalogWebApi

## Start the project

- Open Docker on your PC
- Open Developer PowerShell in Visual Studio
- Write `docker-compose build`
- After write `docker-compose up`
- Open API in browser http://localhost:10000/swagger/index.html

## Start with Visual Studio

Add postgres to Docker if you don't have one
```powershell
docker pull postgres
```
After
```powershell
docker run --name postgres --restart=always -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=carcatalogservice -v postgresvolume:/var/lib/postgresql/data -d postgres
```
